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
      email: 'szymko@szymko.com'
    },
  },
  {
    model: 'users',
    data: {
      id: '08fcba32-23b9-4678-ba4a-bc688b6472c1',
      created_at: new Date(2019, 9, 1),
      updated_at: new Date(2019, 9, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Svend Pinock",
      "email": "spinock0@wisc.edu"
    },
  },
  {
    model: 'users',
    data: {
      id: 'bab49418-7c3b-4dec-8120-c41648ff18cb',
      created_at: new Date(2019, 9, 12),
      updated_at: new Date(2019, 9, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Imojean Derill",
      "email": "iderill1@disqus.com"
    },
  },
  {
    model: 'users',
    data: {
      id: 'fd179a7c-3059-4286-9e8e-52a133460709',
      created_at: new Date(2019, 11, 1),
      updated_at: new Date(2019, 11, 1),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Titos Allewell",
      "email": "tallewell2@eepurl.com"
    },
  },
  {
    model: 'users',
    data: {
      id: '544dda84-8986-405c-8135-b0da3b956f0c',
      created_at: new Date(2019, 12, 12),
      updated_at: new Date(2019, 12, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Fraser Cantero",
      "email": "fcantero3@wunderground.com"
    },
  },
  {
    model: 'users',
    data: {
      id: 'aa26cf54-3a77-44a6-82c5-8174248f450d',
      created_at: new Date(2019, 8, 13),
      updated_at: new Date(2019, 8, 13),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Gill Hargerie",
      "email": "ghargerie4@miibeian.gov.cn"
    },
  },
  {
    model: 'users',
    data: {
      id: '114a2cdb-dd92-4093-af17-52e221683330',
      created_at: new Date(2019, 2, 12),
      updated_at: new Date(2019, 2, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Kim Coch",
      "email": "kcoch5@uol.com.br"
    },
  },
  {
    model: 'users',
    data: {
      id: 'a21c87bb-1ef1-4074-a302-72808e3efa5e',
      created_at: new Date(2019, 1, 1),
      updated_at: new Date(2019, 1, 1),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Noel Massinger",
      "email": "nmassinger6@seesaa.net"
    },
  },
  {
    model: 'users',
    data: {
      id: 'e894430a-9aa9-4e80-8302-4ce16a2550ec',
      created_at: new Date(2019, 1, 12),
      updated_at: new Date(2019, 1, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      name: 'Tych Seedow',
      email: 'po.co@nam.ich',
    },
  },
  {
    model: 'users',
    data: {
      id: '9c620dc5-ec2f-43b1-9b1e-92c7ce01a45f',
      created_at: new Date(2019, 12, 12),
      updated_at: new Date(2019, 12, 12),
      password: '356d0bb1819708b612f2e3d3b5936200fa3aa8f5bffab331412b0e05242c640d', // That's Test1@ for each
      "name": "Anna Fettiplace",
      "email": "afettiplace7@zimbio.com"
    },
  },
  {
    model: 'projects',
    data: {
      id: '9c620dc5-ec2f-43b1-9b1e-92c7ce01a45f',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Bitwolf",
      state: 'Planning',
      lead_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: '08f416f5-bcd7-4e16-8168-09a1516ffa35',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Tresom",
      state: 'Planning',
      lead_id: 'aa26cf54-3a77-44a6-82c5-8174248f450d',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: 'c1b83d0e-180b-4e21-b545-d0f6ac6e2648',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Veribet",
      state: 'Planning',
      lead_id: 'a21c87bb-1ef1-4074-a302-72808e3efa5e',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: '03a39404-6015-4cf1-b5b8-c9cf138989ba',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Vagram",
      state: 'Cancelled',
      lead_id: 'a21c87bb-1ef1-4074-a302-72808e3efa5e',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: '04baeae5-37ad-4f89-aae4-1e7a48ba3504',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Sub-Ex",
      state: 'Planning',
      lead_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: 'c9858f7d-3dfc-4ef1-a85f-42f18c1207fc',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Regrant",
      state: 'Cancelled',
      lead_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: '1816c6a0-1f5a-46f8-adb6-076221975695',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Bigtax",
      state: 'Completed',
      lead_id: 'e0d71f75-c32c-4c61-9879-6d65f353d3ab',
      identifier: 'ENV'
    },
  },
  {
    model: 'projects',
    data: {
      id: '38184a13-4273-499a-af73-f5a053cdb589',
      created_at: new Date(2012, 12, 14),
      updated_at: new Date(2019, 12, 1),
      "name":"Namfix",
      state: 'In Development',
      lead_id: '9c620dc5-ec2f-43b1-9b1e-92c7ce01a45f',
      identifier: 'ENV'
    }
  },
  {
    model: 'projects',
    data: {
      id: '4783c6f9-1e63-4958-968e-7dd6a5b02915',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      "name":"Hatity",
      state: 'In Development',
      lead_id: 'e894430a-9aa9-4e80-8302-4ce16a2550ec',
      identifier: 'ENV'
    },
  },
  {
    model: 'sprints',
    data: {
      id: '4783c6f9-1e63-4958-968e-7dd6a5b02915',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      name: 'Create application base.',
      description: 'Prepare project boilerplate with basic features.',
      start: new Date(2020, 1, 12),
      end: new Date(2020, 1, 15)
    }
  },
  {
    model: 'sprints',
    data: {
      id: '38184a13-4273-499a-af73-f5a053cdb589',
      created_at: new Date(2019, 12, 1),
      updated_at: new Date(2019, 12, 1),
      name: 'Apply changes made by client.',
      description: 'The client wants some changes made in website form.',
      start: new Date(2019, 10, 12),
      end: new Date(2019, 10, 15)
    }
  }
];
