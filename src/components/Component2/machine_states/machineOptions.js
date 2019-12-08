import { assign } from "xstate";
import {  
  getStocks,
  disableStocks,
  reloadStocks
} from "../services";

const initMachineOptions = (
) => ({
  guards: {
  },
  services: {
    requestStocks: (context, event) => getStocks(context),
    requestSaveStocks: (context, event) => disableStocks(event),
    requestReloadStocks: (context, event) => reloadStocks(context),
  },
  actions: {
    cacheStocks: assign((context, event) => ({
      stocks: event.data,
      error: false
    })),
    cacheStocksSelected: assign((context, event) => ({
      stocks_selected: event,
      error: false,
    })),
    cacheMessage: assign((context, event) => ({
      ok_message: event.data.detail
    })),
    cacheStocksError: assign((context, event) => ({
      ok_message: event.data.detail,
      error: true
    })),
    cacheNewStocks: assign((context, event) => ({
      stocks: event.data,
      error: false
    })),
    cacheNewStocksError: assign((context, event) => ({
      ok_message: event.data.detail,
      error: true
    })),
    cacheResetMessage: assign((context, event) => ({
      ok_message: null,
      error: false
    })),
  }
});

export default initMachineOptions;
