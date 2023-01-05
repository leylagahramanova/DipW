import User from "../models/UserModel.js";
import argon2 from "argon2";
export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    const match = await argon2.verify(user.password, req.body.password);
    if (match) return res.status(400).json({ msg: "Wrong Password " });
    req.session.userld = user.uuid
    const uuid = user.uuid;
    const surename = user.surename;
    const firstname = user.firstname;
    const email = user.email;
    const post = user.post;
    res.status(200).json({ uuid, surename, firstname, email, post});
}

export const Me = async(req, res)=>{ 
if (!req.Session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
}
    const user = await User.findOne({
        attributes: ['uuid', 'surename', 'firstname', 'email', 'post'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout " });
        res.status(200).json({ msg: "Anda telah logout" });
    });

}

