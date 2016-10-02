import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BloodDonationMainModule } from './bd.module';

const platfom = platformBrowserDynamic();
platfom.bootstrapModule(BloodDonationMainModule);