const mongoose = require("mongoose");

const { Schema } = mongoose;
const Mixed = Schema.Types.Mixed;

const StepSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  estimated_time_in_days: { type: Number, required: true }
});

const RoleSchema = new Schema({
  title: String,
  skills_required: [String],
  experience_required_in_years: Number,
  count: Number,
  expected_salary: Number
});

const HRSchema = new Schema({
  total_employees_required: Number,
  roles: [RoleSchema]
});

const SoftwareRequirementSchema = new Schema({
  name: String,
  type: String,
  license_type: String,
  estimated_cost: Number,
  commercial_use_allowed: Boolean
});

const LicenseServiceSchema = new Schema({
  name: String,
  purpose: String,
  license_type: String,
  estimated_cost: Number,
  commercial_use_allowed: Boolean
});

const EstimatedPricingSchema = new Schema({
  one_time_cost: {
    breakdown: [
      {
        item: String,
        cost: Number
      }
    ],
    total: Number
  },
  monthly_maintenance_cost: {
    breakdown: [
      {
        item: String,
        cost: Number
      }
    ],
    total: Number
  }
});

const PaymentScheduleSchema = new Schema({
  milestone: String,
  amount: Number
});

const TimelineSchema = new Schema({}, { strict: false }); // dynamic keys: week_1, week_2...

const ProjectProposalSchema = new Schema({
  uid: String,
  search_string: String,
  input_summary: {
    query: String,
    budget: Number,
    location: String
  },
  location: String,
  budget: Number,
  project_title: String,
  objective: String,
  modules: [String],
  technology_stack: Mixed, 
  timeline: TimelineSchema,
  HR: HRSchema,
  software_requirements: [SoftwareRequirementSchema],
  licenses_and_services: [LicenseServiceSchema],
  deliverables: [String],
  steps: [StepSchema],
  estimated_pricing: EstimatedPricingSchema,
  payment_schedule: [PaymentScheduleSchema],
  conclusion: String
});

// Find all past searches (only search strings) of a user by uid
ProjectProposalSchema.statics.findByUid = async function (uid) {
  try {
    const proposals = await this.find({ uid }).select('search_string');
    return { error: false, proposals };
  } catch (error) {
    console.error(error);
    return { error: true, message: "Error fetching proposals", proposals: [] };
  }
};

module.exports = mongoose.model("ProjectProposal", ProjectProposalSchema);