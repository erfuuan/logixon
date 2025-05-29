import  Report  from '../models/report.js'

export default {
    async createReport(data) {
        try {
            const report = await Report.create(data);
            return report;
        } catch (error) {
            console.error('Error creating report:', error);
            throw error;
        }
    }

}