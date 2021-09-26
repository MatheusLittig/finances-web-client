import {
  ActiveModelSerializer,
  createServer,
  Factory,
  Model,
  Server,
} from 'miragejs';
import faker from 'faker';
import { PaymentMethod, Transaction, UserBalance } from '@/types';

export const makeServer = (): Server => {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },

    models: {
      transaction: Model.extend<Partial<Transaction>>({}),
      user_balance: Model.extend<Partial<UserBalance>>({}),
    },

    factories: {
      transaction: Factory.extend({
        ammount() {
          return faker.finance.amount();
        },
        description() {
          return faker.finance.transactionDescription();
        },
        pay_method() {
          const paymentMethod: PaymentMethod[] = [
            'credit_card',
            'billet',
            'pix',
            'cash',
          ];
          const random = Math.floor(Math.random() * paymentMethod.length);

          return paymentMethod[random];
        },
        date() {
          return faker.date.between('2021-9-11', '2021-9-18');
        },
      }),
    },

    seeds(server) {
      server.createList('transaction', 5);

      server.create('user_balance', {
        id: '1',
        type: 'balance',
        ammount: 2886.71,
      });
      server.create('user_balance', {
        id: '2',
        type: 'entries',
        ammount: 4192.81,
      });
      server.create('user_balance', {
        id: '3',
        type: 'exits',
        ammount: 1921.26,
      });
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/transactions', schema => {
        const response = schema.all('transaction');
        const { models } = response;

        return models;
      });

      this.get('/user-balances', schema => {
        const response = schema.all('user_balance');
        const { models } = response;

        return models;
      });

      this.namespace = '';
      this.passthrough();
    },
  });

  return server;
};
