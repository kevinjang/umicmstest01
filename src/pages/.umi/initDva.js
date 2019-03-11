import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'menus', ...(require('E:/zhm/umicmstest01/src/models/menus.js').default) });
app.model({ namespace: 'tabs', ...(require('E:/zhm/umicmstest01/src/models/tabs.js').default) });
app.model({ namespace: 'validatorRules', ...(require('E:/zhm/umicmstest01/src/models/validatorRules.js').default) });
