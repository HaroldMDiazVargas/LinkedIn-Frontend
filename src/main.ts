import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { provideEffects } from '@ngrx/effects';
// import { SocketIoModule } from 'ngx-socket-io';
import * as authEffects from './app/auth/store/effects';
import * as postEffects from './app/home/store/effects';
import { appReducer } from './app/store/app.state';
import { postReducer } from './app/home/store/reducers';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    importProvidersFrom(HttpClientModule),
    // importProvidersFrom(SocketIoModule.forRoot({ url: 'http://localhost:3000', options: {}}
    // )),
    // provideStore({                                  //Register Store, this because we can standalone!
    //   auth: authReducer,
    //   posts: postReducer
    // }),
    // provideStore(appReducer),                                     
    provideStore({}),
    provideState(authFeatureKey, authReducer),
    provideEffects(authEffects),
    // importProvidersFrom(StoreModule.forRoot({})),                                
    // provideState('appStore', appReducer),        //Takes NAME('auth') and reducer group. Similar on module app as StoreModule.forFeature(name, reducer)  | StoreModule.forRoot on imports[]
    // provideEffects(authEffects, postEffects),                      // Register effects globally, similar on module app as EffectsModule.forFeature([Effects]) | .forRoot
    provideStoreDevtools({                            //SetUp config of redux-devtools in my app!
      maxAge: 25,                                     //Set up maximum amount of action that we're storing, we need this limitation for performance
      logOnly: !isDevMode(),
      autoPause: true,                                //To avoid too many actions
      trace: false,
      traceLimit: 75 
     }),                  
    provideRouter(routes),
    provideAnimations(),
 
  ],
});
