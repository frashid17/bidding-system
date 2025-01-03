import { AppNexusSSP } from './providers/appnexus';
import { RubiconSSP } from './providers/rubicon';
import { OpenXSSP } from './providers/openx';
import { PubMaticSSP } from './providers/pubmatic';
import { SSPProvider } from '../../types/ssp';

export const sspProviders: Record<string, SSPProvider> = {
  appnexus: new AppNexusSSP(),
  rubicon: new RubiconSSP(),
  openx: new OpenXSSP(),
  pubmatic: new PubMaticSSP(),
};