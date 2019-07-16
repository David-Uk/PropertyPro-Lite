import { adverts } from '../models/models';
import { imageUpload } from '../middleware/multer';
import { checkUserType, currentUser } from '../helpers/utilities';
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

    let image;
    if (req.file) {
        const fileUrl = imageUpload(req);
        if (fileUrl) {
            image = fileUrl;
        } else {
            image = 'https://via.placeholder.com/350x150';
        }
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
        Image: image,
        created_on: datetime,
        created_by_staffId: activeUser.id,
        created_by_staffName: activeUser.firstName,
        owner_email: activeUser.email,
        owner_phoneNo: activeUser.phoneNumber
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