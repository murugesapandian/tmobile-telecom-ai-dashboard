import { useState, useEffect, useCallback } from 'react';
import { STATE_PROVIDER_DATA } from '../data/stateProviderData';
import logger from '../services/LoggingService';

const generateNoise = (base, amplitude = 2) =>
  Math.max(0, Math.min(100, base + (Math.random() - 0.5) * amplitude));

export const useRealTimeData = (intervalMs = 3000) => {
  const [liveData, setLiveData] = useState(STATE_PROVIDER_DATA);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [updateCount, setUpdateCount] = useState(0);

  const tick = useCallback(() => {
    setLiveData(prev =>
      prev.map(state => {
        const drift = (Math.random() - 0.5) * 0.8;
        return {
          ...state,
          att:      Math.max(5,  Math.min(55, state.att + drift)),
          verizon:  generateNoise(state.verizon, 0.8),
          tmobile:  generateNoise(state.tmobile, 0.8),
          comcast:  generateNoise(state.comcast, 0.5),
          spectrum: generateNoise(state.spectrum, 0.5),
        };
      })
    );
    setLastUpdated(new Date());
    setUpdateCount(c => {
      const next = c + 1;
      // Log every 10th tick to avoid flooding
      if (next % 10 === 0) {
        logger.realtimeUpdate('STATE_MARKET_SHARE', STATE_PROVIDER_DATA.length);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    logger.info('REALTIME', 'MARKET_SHARE_FEED_INIT', {
      intervalMs,
      stateCount: STATE_PROVIDER_DATA.length,
      note: 'SIMULATED: Math.random() noise applied to static base values — NOT live T-Mobile data',
    });
    if (!isLive) return;
    const timer = setInterval(tick, intervalMs);
    return () => clearInterval(timer);
  }, [isLive, intervalMs, tick]);

  return { liveData, lastUpdated, isLive, setIsLive, updateCount };
};

export const useKPIMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalSubscribers: 129500000,
    tmobileMarketShare: 24.1,
    statesLeading:    10,
    npsScore:         22,
    revenueQ:         20.1,
    homeInternetSubscribers: 6800000,
    networkUptime:    99.91,
    churnRate:        0.86,
  });

  useEffect(() => {
    logger.info('DATA_LOAD', 'KPI_METRICS_INIT', {
      note: 'SIMULATED: Hardcoded baseline values with random drift — NOT from T-Mobile billing/BSS systems',
      baselineSubscribers: 129500000,
      baselineMarketShare: '24.1%',
    });
    const timer = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalSubscribers: prev.totalSubscribers + Math.floor(Math.random() * 500 - 100),
        tmobileMarketShare: Math.max(23, Math.min(25, prev.tmobileMarketShare + (Math.random() - 0.5) * 0.05)),
        networkUptime:    Math.max(99.8, Math.min(99.99, prev.networkUptime + (Math.random() - 0.5) * 0.01)),
        churnRate:        Math.max(0.7, Math.min(1.1, prev.churnRate + (Math.random() - 0.5) * 0.02)),
        homeInternetSubscribers: prev.homeInternetSubscribers + Math.floor(Math.random() * 300 - 50),
      }));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return metrics;
};

export const useRealtimeSubscriberFeed = () => {
  const [feed, setFeed] = useState([]);
  const states    = ['TX', 'CA', 'FL', 'NY', 'GA', 'IL', 'PA', 'OH', 'NC', 'WA'];
  const actions   = ['New subscriber', 'Plan upgrade', 'Home Internet activation', 'Port-in', '5G migration'];
  const providers = ['T-Mobile Home Internet', 'T-Mobile 5G', 'T-Mobile Mobile', 'T-Mobile Business'];

  useEffect(() => {
    logger.info('DATA_LOAD', 'SUBSCRIBER_FEED_INIT', {
      note: 'SIMULATED: Events are randomly generated strings, NOT real subscriber transactions',
      intervalMs: 1800,
      maxQueueSize: 20,
    });
    const timer = setInterval(() => {
      const newEvent = {
        id:      Date.now(),
        state:   states[Math.floor(Math.random() * states.length)],
        action:  actions[Math.floor(Math.random() * actions.length)],
        service: providers[Math.floor(Math.random() * providers.length)],
        time:    new Date().toLocaleTimeString(),
        value:   `$${(Math.random() * 100 + 40).toFixed(2)}`,
      };
      logger.debug('REALTIME', 'SUBSCRIBER_EVENT_GENERATED', {
        state: newEvent.state, action: newEvent.action, service: newEvent.service,
        note: 'FAKE_EVENT',
      });
      setFeed(prev => [newEvent, ...prev].slice(0, 20));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return feed;
};
