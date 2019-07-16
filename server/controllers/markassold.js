
import { adverts } from '../models/models';

import { currentUser, loggedinUser, checkAdvertId, checkAdvert } from '../helpers/utilities';

exports.markAsSold = (req, res) => {
    const { body: { newStatus }, params: { propertyId } } = req;

    const activeUser = currentUser(req.userId);
    loggedinUser(activeUser, res);

    const advertObject = checkAdvert(propertyId);

    checkAdvertId(advertObject, propertyId, res);

    if (!newStatus || newStatus !== 'SOLD') {
        return res.status(400).json({
            status: "error",
            error: 'the newStatus value should be = SOLD',
        });
    }

    const soldObj = {
        id: advertObject.id,
        status: newStatus,
        type: advertObject.Type,
        state: advertObject.Ttate,
        city: advertObject.City,
        address: advertObject.Address,
        price: advertObject.Price,
        imageUrl: advertObject.Image,
        created_on: advertObject.created_on,
        created_by_staffId: activeUser.id,
        created_by_staffName: activeUser.firstName,
    };

    let index = null;
    adverts.forEach((advert, i) => {
        if (advert.propertyId === Number(propertyId)) {
            index = i;
        }
    });

    adverts.splice(index, 1, soldObj);

    return res.status(200).json({
        status: "success",
        data: soldObj,
    });
};
