import { adverts } from '../models/models';

exports.searchAdvertType = (req, res) => {
    const { params: { type } } = req;

    const specificsData = adverts.filter(obj => obj.propertyType === type);
    return res.status(200).json({
        status: "success",
        data: specificsData,
    });
};
