import { Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { WidgetComponent } from './widget/widget.component';
import { AboutusComponent } from './aboutus/aboutus.component';



import { SupportComponent } from './support/support.component';
import { BlogComponent } from './blog/blog.component';
import { ChatComponent } from './chat/chat.component';
import { PaigenotfoundComponent } from './paigenotfound/paigenotfound.component';
import { UpdateComponent } from './update/update.component';
import { NftComponent } from './nft/nft.component';
import { NodeComponent } from './node/node.component';
import { TestnetComponent } from './testnet/testnet.component';
// Добавьте дополнительные компоненты по мере необходимости

export const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'dashboard', component: WidgetComponent },
  {path:'About-us', component:AboutusComponent},
  {path:"Blog",component:BlogComponent},
  {path:"Contact-support",component:SupportComponent},
  {path:"Chat-gpt",component:ChatComponent},
  {path:"update-system",component:UpdateComponent},
  {path:"nft-guide",component:NftComponent},
  {path:"crypto-nodes",component:NodeComponent},
  {path:"testnet-guide",component:TestnetComponent},

  // { path: 'admin', component: AdminComponent },
{ path: '**', component: PaigenotfoundComponent }
];
