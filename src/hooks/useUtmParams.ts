import { useEffect, useState } from 'react';
import { resolveUtmParams, UtmParams } from '../utils/utm';

export function useUtmParams(): UtmParams {
  const [utmParams, setUtmParams] = useState<UtmParams>({});

  useEffect(() => {
    const params = resolveUtmParams();
    setUtmParams(params);
  }, []);

  return utmParams;
}
