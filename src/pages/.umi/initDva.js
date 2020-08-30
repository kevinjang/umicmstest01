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

app.model({ namespace: 'cabinTypeCodes', ...(require('F:/Projects/Nodejs/git-kaikeba/umicmstest01/src/models/cabinTypeCodes.js').default) });
app.model({ namespace: 'columns', ...(require('F:/Projects/Nodejs/git-kaikeba/umicmstest01/src/models/columns.js').default) });
app.model({ namespace: 'global', ...(require('F:/Projects/Nodejs/git-kaikeba/umicmstest01/src/models/global.js').default) });
app.model({ namespace: 'menus', ...(require('F:/Projects/Nodejs/git-kaikeba/umicmstest01/src/models/menus.js').default) });
app.model({ namespace: 'tabs', ...(require('F:/Projects/Nodejs/git-kaikeba/umicmstest01/src/models/tabs.js').default) });
app.model({ namespace: 'validatorRules', ...(require('F:/Projects/Nodejs/git-kaikeba/umicmstest01/src/models/validatorRules.js').default) });
