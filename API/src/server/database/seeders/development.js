const { v4 } = require('uuid');

module.exports = [
  {
    model: 'users',
    data: {
      id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
      created_at: new Date(2019, 10, 1),
      updated_at: new Date(2019, 10, 1),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Szymko Tokarzeszczak',
      email: 'szymko@szymko.szymko'
    }
  },
  {
    model: 'users',
    data: {
      id: '08fcba32-23b9-4678-ba4a-bc688b6472c1',
      created_at: new Date(2019, 9, 1),
      updated_at: new Date(2019, 9, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Szymko Tokarzeszczak',
      email: 'szymek00@szymko.com'
    }
  },
  {
    model: 'users',
    data: {
      id: 'bab49418-7c3b-4dec-8120-c41648ff18cb',
      created_at: new Date(2019, 9, 12),
      updated_at: new Date(2019, 9, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Piotur Taras',
      email: 'pioter@werandowski.pl'
    }
  },
  {
    model: 'users',
    data: {
      id: 'fd179a7c-3059-4286-9e8e-52a133460709',
      created_at: new Date(2019, 11, 1),
      updated_at: new Date(2019, 11, 1),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Szubin Tokarzewicz',
      email: 'sztokrzewicz@gmail.com'
    }
  },
  {
    model: 'users',
    data: {
      id: '544dda84-8986-405c-8135-b0da3b956f0c',
      created_at: new Date(2019, 12, 12),
      updated_at: new Date(2019, 12, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Weronka Kowalik',
      email: 'mithrills@gmail.com'
    }
  },
  {
    model: 'users',
    data: {
      id: 'aa26cf54-3a77-44a6-82c5-8174248f450d',
      created_at: new Date(2019, 8, 13),
      updated_at: new Date(2019, 8, 13),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'XD',
      email: 'duj@wchupie.com'
    }
  },
  {
    model: 'users',
    data: {
      id: '114a2cdb-dd92-4093-af17-52e221683330',
      created_at: new Date(2019, 2, 12),
      updated_at: new Date(2019, 2, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Orzeł-1',
      email: 'zaloga.dzielnego@orzela.com'
    }
  },
  {
    model: 'users',
    data: {
      id: 'a21c87bb-1ef1-4074-a302-72808e3efa5e',
      created_at: new Date(2019, 1, 1),
      updated_at: new Date(2019, 1, 1),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Chuj Kurwa',
      email: 'niechce@juz.tworzyc'
    }
  },
  {
    model: 'users',
    data: {
      id: 'e894430a-9aa9-4e80-8302-4ce16a2550ec',
      created_at: new Date(2019, 1, 12),
      updated_at: new Date(2019, 1, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Tych Seedow',
      email: 'po.co@nam.ich'
    }
  },
  {
    model: 'users',
    data: {
      id: '9c620dc5-ec2f-43b1-9b1e-92c7ce01a45f',
      created_at: new Date(2019, 12, 12),
      updated_at: new Date(2019, 12, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Tyle Wogole',
      email: 'pioter@pomusz'
    }
  },
  {
    model: 'session_tokens',
    data: {
      id: '02e73780-e7b7-470b-a539-4f785770ebf1',
      created_at: new Date(2019, 10, 1),
      updated_at: new Date(2019, 10, 1),
      user_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab'
    }
  }
];
