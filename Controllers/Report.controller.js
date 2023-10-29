const mongoose = require('mongoose')
const UserReport = require('../Models/UserReport.model')
const UserProfile = require('../Models/UserProfile.model')
const Advert = require('../Models/Advert.model')

const createReport = async (req, res) => {

    const userID = req.user.profileID;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ error: 'invalid' });
    }

    try {

        const report = new UserReport({
            userId: userID,
            advertId: req.body.advertId,
            description: req.body.description,
        });

        const profile = await UserProfile.findById(userID).select('reportsID');

        profile.reportsID.push(report._id);

        await profile.save();
        await report.save();

        res.status(200).send();

    } catch (error) {
        console.log(error)
        res.status(500)
    }
};

const getAllReportsByAdmin = async (req, res) => {

    try {
        const reports = await UserReport.find()
            .populate('userId', 'firstName lastName')
            .populate('advertId', 'title', 'delete');
        res.status(200).send(reports);
    } catch (error) {
        console.log(error)
        res.status(500)
    }

};

const reviewReport = async (req, res) => {

    const reportId = req.params.reportId;

    try {
        const updatedReport = await UserReport.findByIdAndUpdate(
            reportId,
            { inReview: false },
            { new: true }
        );

        console.log(updatedReport);
        if (!updatedReport) {
            return res.status(404).json({ error: 'User report not found' });
        }

        res.status(200).send(updatedReport);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

const deleteReport = async (req, res) => {

    const reportId = req.params.reportId;

    try {
        
        const userId = await UserReport.findById(reportId).select('userId');
        const result = await UserReport.findByIdAndDelete(reportId);

        if (!result) {
            return res.status(404).json({ error: 'User report not found' });
          }
         
        const userProfile = await UserProfile.findById(userId.userId).select('reportsID');
        userProfile.reportsID = userProfile.reportsID.filter((id) => {
            return id != reportId
        });

        await userProfile.save();  
        
        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

module.exports = { createReport, getAllReportsByAdmin, reviewReport, deleteReport };