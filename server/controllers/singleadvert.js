import { adverts } from '../models/models';
import { checkUserType, currentUser, checkAdvert } from '../helpers/utilities';
import { checkAdEmptyFileds } from '../helpers/validators';
import { datetime } from '../helpers/utilities';

exports.createAdvert = (req, res) => {
    const {
        status, type, state, city, address, price, imageUrl,
    } = req.body;

    checkAdEmptyFileds(status, type, state, city, address, price, imageUrl, res);

    const activeUser = currentUser(req.userId);

    if (checkUserType(activeUser, res)) {
        return checkUserType(activeUser, res);
    }

    const advertId = adverts.length + 1;
    const propertyAdvert = {
        id: advertId,
        Status: status,
        Type: type,
        State: state,
        City: city,
        Address: address,
        Price: price,
        Image: imageUrl,
        created_on: datetime,
        created_by_staffId: activeUser.id,
        created_by_staffName: activeUser.firstName,
    };

    adverts.push(propertyAdvert);

    return res.status(201).json({
        status: "success",
        data: propertyAdvert,
    });
};

exports.allAdverts = (req, res) => res.status(200).json({
    status: "success",
    data: adverts,
});

exports.singleAdvert = (req, res) => {
    const { params: { propertyId } } = req;

    const advertObj = checkAdvert(propertyId);
    if (!advertObj) {
        return res.status(400).json({
            status: "error",
            data: {
                message: `There is no property with Id: ${propertyId}`,
            },
        });
    }

    return res.status(200).json({
        status: "success",
        data: advertObj,

    });
};
