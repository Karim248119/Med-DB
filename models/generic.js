module.exports = class genericModel {
  #Model;
  constructor(model) {
    this.#Model = model;
  }

  async create(data) {
    const instance = new this.#Model(data);
    return await instance.save();
  }

  async getAll(filters = {}, populateObjs = [], page, limit) {
    const totalCount = await this.#Model.countDocuments(filters);
    const totalPages = Math.ceil(totalCount / limit);

    let query = this.#Model
      .find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    if (Array.isArray(populateObjs)) {
      populateObjs.forEach((populateObj) => {
        const populateFields = Array.isArray(populateObj.fields)
          ? populateObj.fields.join(" ")
          : "";
        query = query.populate(populateObj.ref, populateFields);
      });
    }

    const results = await query;

    return {
      data: results,
      totalPages,
    };
  }

  async getById(id) {
    return await this.#Model.findById(id);
  }

  async update(id, data) {
    return await this.#Model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.#Model.findByIdAndDelete(id);
  }
};
