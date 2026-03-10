/**
 * Media paths — optimized local images for all pages.
 *
 * All images are processed via scripts/optimize-images.js
 * into JPEG + WebP at multiple breakpoints under public/media/optimized/.
 */

const O = '/media/optimized';

const placeholders = {
  heroes: {
    home: `${O}/home/cctv-monitors-lg.jpg`,
    about: `${O}/about/hero-evolution-lg.jpg`,
    services: `${O}/heroes/services-hero-lg.jpg`,
    coverage: `${O}/heroes/coverage-hero-lg.jpg`,
    careers: `${O}/heroes/careers-hero-lg.jpg`,
    contact: `${O}/heroes/contact-hero-lg.jpg`,
    whistleblower: `${O}/services/guard-checkpoint-lg.jpg`,
  },

  services: {
    cit: `${O}/services/cit-hero-lg.jpg`,
    guards: `${O}/services/guards-hero-lg.jpg`,
    cargo: `${O}/services/cargo-hero-lg.jpg`,
    technology: `${O}/services/technology-hero-lg.jpg`,
    consulting: `${O}/services/consulting-hero-lg.jpg`,
    conceptDesign: `${O}/heroes/services-hero-lg.jpg`,
    executive: `${O}/services/executive-hero-lg.jpg`,
    atm: `${O}/services/atm-hero-lg.jpg`,
    custom: `${O}/services/custom-hero-lg.jpg`,
  },

  sections: {
    ctaBg: `${O}/home/cta-bg-lg.jpg`,
    cctvMonitors: `${O}/home/cctv-monitors-lg.jpg`,
    teamCulture: `${O}/careers/team-culture-lg.jpg`,
    guardEquipment: `${O}/services/guard-equipment-lg.jpg`,
    guardCheckpoint: `${O}/services/guard-checkpoint-lg.jpg`,
    guardMonitoring: `${O}/services/guard-monitoring-lg.jpg`,
    mexicanPesos: `${O}/services/mexican-pesos-lg.jpg`,
    securityTech: `${O}/services/security-tech-lg.jpg`,
    radioOperator: `${O}/services/radio-operator-lg.jpg`,
    tacticalOfficer: `${O}/services/tactical-officer-lg.jpg`,
    bodyguardRadio: `${O}/services/bodyguard-radio-lg.jpg`,
    guardProfile: `${O}/services/guard-profile-lg.jpg`,
    cashCounting: `${O}/services/cash-counting-lg.jpg`,
    guardPortrait: `${O}/services/guard-portrait-lg.jpg`,
    atmOperation: `${O}/services/atm-operation-lg.jpg`,
    assetProtection: `${O}/services/asset-protection-lg.jpg`,
    guardRadioCap: `${O}/heroes/guard-radio-cap-lg.jpg`,
    policeThinking: `${O}/services/police-thinking-lg.jpg`,
    guardAnonymous: `${O}/services/guard-anonymous-lg.jpg`,
  },
};

export default placeholders;
