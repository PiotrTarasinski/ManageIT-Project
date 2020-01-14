import db from '../../../../database';
import CustomResponse, { CustomResponseType } from '../../../error/CustomError';

class LabelMethods {

  async getProjectLabels(projectId: string) {
    return await db.Label.findAll({
      where: {
        projectId
      }
    });
  }

  async getProjectRoles(projectId: string) {
    return await db.RoleLabel.findAll({
      where: {
        projectId
      }
    });
  }

  async createProjectLabel(projectId: string, name: string, color: string) {
    return await db.Label.create({
      projectId,
      name,
      color
    });
  }

  async createProjectRole(projectId: string, name: string, color: string) {
    return await db.RoleLabel.create({
      projectId,
      name,
      color
    });
  }

  async updateProjectLabel(labelId: string, name: string, color: string) {
    return await db.Label.findByPk(labelId)
    .then(async label => {
      if (label) {
        return await label.update({ name, color });
      }
      return label;
    });
  }

  async updateProjectRole(roleId: string, name: string, color: string) {
    return await db.RoleLabel.findByPk(roleId)
    .then(async role => {
      if (role) {
        return await role.update({ name, color });
      }
      return role;
    });
  }

  async deleteProjectLabel(labelId: string): Promise<CustomResponseType> {
    return await db.Label.findByPk(labelId)
    .then(async label => {
      if (label) {
        return await label.destroy()
        .then(() => CustomResponse(200, 'Label deleted successfully.'))
        .catch(() => CustomResponse(500, 'Couldn\'t delete label.', { formError: 'Database error.' }));
      }
      return CustomResponse(404, 'No such label.', { formError: 'Label not found.' });
    });
  }

  async deleteProjectRole(labelId: string): Promise<CustomResponseType> {
    return await db.RoleLabel.findByPk(labelId)
    .then(async role => {
      if (role) {
        return await role.destroy()
        .then(() => CustomResponse(200, 'Role deleted successfully.'))
        .catch(() => CustomResponse(500, 'Couldn\'t delete Role.', { formError: 'Database error.' }));
      }
      return CustomResponse(404, 'No such role.', { formError: 'Role not found.' });
    });
  }
}

export default LabelMethods;
