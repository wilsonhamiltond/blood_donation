import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { VotingMainModule } from './voting.module';

const platfom = platformBrowserDynamic();
platfom.bootstrapModule(VotingMainModule);