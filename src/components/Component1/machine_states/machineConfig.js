const machineConfig = {
  id: "stocks",
  context: {
    stocks: [],
    stocks_selected: [],
    ok_message: ""
  },
  initial: "pending_stocks",
  states: {
    pending_stocks: {
      type: 'parallel',
      states: {
        load_stocks: {
          type: 'compound',
          initial: 'pending',
          states: {
            pending: {
              invoke: { 
                id: 'service_stocks_id', 
                src: 'requestStocks',
                onDone: {
                  actions: 'cacheStocks',
                  target: 'success'
                },
                onError: {
                  actions: 'cacheStocksError'
                }
              }
            },
            success: {
              type: 'final'
            }
          }
        },
      },
      onDone: 'ready'
    },
    ready: {
      type: "parallel",
      on: {
        SUBMIT: {
            target: "pending_save_stocks",
            actions: 'cacheStocksSelected',
        },
        SOCKET_COMPONENT1: {
            target: "reload_stocks",
            actions: 'cacheStocksSelected',
        },
      },
      states: {
        idle: {
          on: {
            FETCH: 'success'
          }
        },
        success: {
          type: 'final'
        },
      }
    },
    pending_save_stocks: {
      type: 'compound',
      initial: 'pending',
      states: {
        pending: {
          invoke: { 
            id: 'service_save_stocks_id', 
            src: 'requestSaveStocks',
            onDone: { 
              target: 'set_message',
              actions: 'cacheMessage',
            },
            onError: {
              actions: 'cacheStocksError',
              target: 'set_message'
            },
          },
        },
        set_message: {
          after: {
            50: 'success'
          }
        },
        success: {
          type: 'final'
        },
      },
      onDone: "reload_stocks"
    },
    reload_stocks: {
      type: 'compound',
      initial: 'pending',
      states: {
        pending: {
          invoke: { 
            id: 'service_reload_stocks_id', 
            src: 'requestReloadStocks',
            onDone: { 
              target: 'set_message',
              actions: 'cacheNewStocks',
            },
            onError: {
              actions: 'cacheNewStocksError',
              target: 'set_message'
            },
          },
        },
        set_message: {
          after: {
            50: 'success'
          }
        },
        success: {
          type: 'final'
        },
      },
      onDone: "ready"
    },
  }
};

export default machineConfig