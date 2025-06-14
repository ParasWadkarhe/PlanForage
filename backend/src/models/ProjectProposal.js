const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimated_time_in_days: {
        type: Number,
        required: true
    }
});

const RoleSchema = new mongoose.Schema({
    title: String,
    skills_required: [String],
    experience_required_in_years: Number,
    count: Number,
    expected_salary: Number
});

const HRSchema = new mongoose.Schema({
    total_employees_required: Number,
    roles: [RoleSchema]
});

const TechnologyStackSchema = new mongoose.Schema({
    frontend: [String],
    backend: [String],
    nlp_or_ai: [String],
    database: [String]
});

const TimelineSchema = new mongoose.Schema({}, { strict: false }); // for week_1, week_2, ... dynamic keys

const ProjectProposalSchema = new mongoose.Schema({
    uid: Number,
    search_string: String,
    project_title: String,
    objective: String,
    modules: [String],
    technology_stack: TechnologyStackSchema,
    timeline: TimelineSchema,
    HR: HRSchema,
    deliverables: [String],
    steps: [StepSchema],
    estimated_pricing: mongoose.Schema.Types.Mixed,
    conclusion: String
});


// find all past searches (only search strings and not the rest of result, ex. full scale chat app) of user by uid
ProjectProposalSchema.statics.findByUid = async function (uid) {
    try {
        const proposals = await this.find({ uid }).select('search_string')
        return {error: false, proposals: proposals};
    } catch (error) {
        console.error(error);
        return {error: true, message: "Error fetching proposals", proposals: []};
    }
}


module.exports = mongoose.model("ProjectProposal", ProjectProposalSchema);