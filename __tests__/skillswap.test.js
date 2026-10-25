const {
    filterSkillsByCategory,
    calculateTotalCost,
    matchSkillsToUser
} = require('../skillswap-functions');

const skills = [
    { title: 'Python Tutoring', category: 'Programming', price: 20 },
    { title: 'Guitar Lessons', category: 'Music', price: 15 },
    { title: 'Resume Review', category: 'Career', price: 0 },
    { title: 'Web Development', category: 'Programming', price: 25 }
];


// Filter Skills
describe('filterSkillsByCategory', () => {
    test('filters skills by category', () => {
        expect(filterSkillsByCategory(skills, 'Programming')).toEqual([
            skills[0],
            skills[3]
        ]);
    });

    test('returns all skills when category is All', () => {
        expect(filterSkillsByCategory(skills, 'All')).toEqual(skills);
    });

    test('returns an empty array when no skills match', () => {
        expect(filterSkillsByCategory(skills, 'Cooking')).toEqual([]);
    });
});

// Calulate the Total Cost of each session
describe('calculateTotalCost', () => {
    test('calculates a normal session cost', () => {
        expect(calculateTotalCost(20, 2)).toBe(40);
    });

    test('returns zero for a free session', () => {
        expect(calculateTotalCost(0, 3)).toBe(0);
    });

    test('handles decimal hours', () => {
        expect(calculateTotalCost(25, 1.5)).toBe(37.5);
    });

    test('returns zero when hours are zero', () => {
        expect(calculateTotalCost(20, 0)).toBe(0);
    });
});
