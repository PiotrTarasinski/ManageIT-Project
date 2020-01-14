"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("tasks", [
      {
        id: "873a9c4b-ec2f-4297-90f5-370cc4c2a865",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Task",
        identifier: "ENV",
        title: "Create login from HTML template.",
        points: 3,
        priority: "High",
        state: "Awaiting"
      },
      {
        id: "6ff68e93-feea-4deb-8a85-7e8964dea981",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Improvement",
        identifier: "ENV",
        title: "Add token validation.",
        points: 8,
        priority: "Normal",
        state: "Awaiting"
      },
      {
        id: "0c67d41b-628a-4844-9382-40789c0152d7",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Idea",
        identifier: "ENV",
        title: "Add remember me to login form.",
        points: 1,
        priority: "Low",
        state: "Awaiting"
      },
      {
        id: "e3d3959b-5c27-4968-bc35-cfae45f32b2d",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Bug",
        identifier: "ENV",
        title: "Register form invalid email pass validation.",
        points: 5,
        priority: "Normal",
        state: "Awaiting"
      },
      {
        id: "33ecdd10-9906-4e89-8da2-397c9a3a0be4",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Bug",
        identifier: "ENV",
        title: "DatePicker wrong date format",
        points: 3,
        priority: "Normal",
        state: "Awaiting"
      },
      {
        id: "30462277-2a80-4bcc-b291-80a8fac5548b",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Idea",
        identifier: "ENV",
        title: "To not let existentail crisis kick in.",
        points: 5,
        priority: "Normal",
        state: "Awaiting"
      },
      {
        id: "410d159a-c736-4a41-abc8-22cf049885bb",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Task",
        identifier: "ENV",
        title: "Side menu clipping through horizontal menu.",
        points: 1,
        priority: "Low",
        state: "Awaiting"
      },
      {
        id: "6e4e354c-bed4-4d7d-ae14-cd25defd434c",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Bug",
        identifier: "ENV",
        title: "Sidebar not visible on firefox.",
        points: 4,
        priority: "Normal",
        state: "In progress"
      },
      {
        id: "ac79344f-9a4c-4b04-849e-31c9dfd3c5d4",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Idea",
        identifier: "ENV",
        title: "Add tooltips on sidemenu.",
        points: 4,
        priority: "Normal",
        state: "Awaiting"
      },
      {
        id: "ccdb3656-1c1b-4dc4-a456-92692f67e2ea",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Task",
        identifier: "ENV",
        title: "Finish engineer's thesis.",
        points: 16,
        priority: "High",
        state: "Awaiting"
      },
      {
        id: "b7f75f87-5223-4080-81a0-b14a18163d57",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Task",
        identifier: "ENV",
        title: "Create register form template.",
        points: 6,
        priority: "High",
        state: "Awaiting"
      },
      {
        id: "51b517ab-812f-4809-bcc3-006860768098",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Task",
        identifier: "ENV",
        title: "Suicide attempt.",
        points: 6,
        priority: "Normal",
        state: "Awaiting"
      },
      {
        id: "7b551970-a795-45fc-be29-3fa91601a213",
        project_id: "a6a02365-7052-4236-8894-ac594da9c108",
        created_at: new Date(2018, 12, 1),
        updated_at: new Date(2019, 12, 1),
        type: "Task",
        identifier: "Bug",
        title: "Fix project endpoint to sometimes return code 500.",
        points: 12,
        priority: "High",
        state: "Awaiting"
      },
      {
        id: "7af94690-9b07-49ed-8507-768cabae3ceb",
        created_at: "2019-12-31 02:46:22",
        updated_at: "2020-01-31 00:00:00",
        state: "To do",
        title:
          "turpis donec posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam in",
        identifier: "ENV",
        points: 2,
        priority: "Normal",
        type: "Bug",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "19c9fd43-fb6f-4147-b413-37ccbba64c6c",
        created_at: "2019-12-31 12:48:17",
        updated_at: "2020-01-31 00:00:00",
        state: "Done",
        title:
          "rutrum at lorem integer tincidunt ante vel ipsum praesent blandit",
        identifier: "ENV",
        points: 4,
        priority: "High",
        type: "Idea",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "78d96a37-54f2-4cc7-8649-92390b733cd2",
        created_at: "2019-12-31 22:11:53",
        updated_at: "2020-01-31 00:00:00",
        state: "Done",
        title:
          "blandit mi in porttitor pede justo eu massa donec dapibus duis at velit eu est congue elementum in",
        identifier: "ENV",
        points: 2,
        priority: "Normal",
        type: "Task",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "9845e626-ad78-4761-8662-0663926e3cc5",
        created_at: "2019-12-31 17:13:09",
        updated_at: "2020-01-31 00:00:00",
        state: "To review / test",
        title:
          "donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat convallis morbi odio",
        identifier: "ENV",
        points: 20,
        priority: "High",
        type: "Improvement",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "30a786f1-9107-4f37-bc46-687bd1646205",
        created_at: "2019-12-31 08:09:06",
        updated_at: "2020-01-31 00:00:00",
        state: "In progress",
        title:
          "hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis molestie",
        identifier: "ENV",
        points: 20,
        priority: "High",
        type: "Task",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "305b5c0f-b2bb-4cde-b9da-5a2ba5486fc6",
        created_at: "2019-12-31 02:53:11",
        updated_at: "2020-01-31 00:00:00",
        state: "Done",
        title:
          "convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet erat nulla",
        identifier: "ENV",
        points: 7,
        priority: "Normal",
        type: "Improvement",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "505f5956-e75c-4ce4-99aa-402d020394db",
        created_at: "2019-12-31 10:01:32",
        updated_at: "2020-01-31 00:00:00",
        state: "Awaiting",
        title:
          "volutpat sapien arcu sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in hac habitasse",
        identifier: "ENV",
        points: 9,
        priority: "Low",
        type: "Task",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "4a6adc3c-da82-46ae-9a06-77b268e4f61b",
        created_at: "2019-12-31 22:03:53",
        updated_at: "2020-01-31 00:00:00",
        state: "Done",
        title:
          "cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neque",
        identifier: "ENV",
        points: 9,
        priority: "Low",
        type: "Idea",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "dfb1ca06-74e0-4ae7-8361-3327c3651a3e",
        created_at: "2019-12-31 23:47:03",
        updated_at: "2020-01-31 00:00:00",
        state: "In progress",
        title: "in consequat ut nulla sed accumsan felis ut at dolor quis odio",
        identifier: "ENV",
        points: 9,
        priority: "High",
        type: "Task",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      },
      {
        id: "f4fa28c0-61b5-4b93-ada7-8b6f99071dec",
        created_at: "2019-12-31 10:28:09",
        updated_at: "2020-01-31 00:00:00",
        state: "To do",
        title:
          "ac nibh fusce lacus purus aliquet at feugiat non pretium quis lectus suspendisse potenti in eleifend quam",
        identifier: "ENV",
        points: 18,
        priority: "Low",
        type: "Task",
        project_id: "38184a13-4273-499a-af73-f5a053cdb589"
      }
    ]);
    // return new Promise((resolve, reject) => {
    //   resolve(
    //     fixtures.map(item => queryInterface.bulkInsert(item.model, [item.data]))
    //   );
    // });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all(
      fixtures
        .reverse()
        .map(item => queryInterface.bulkDelete(item.model, null))
    );
  }
};
