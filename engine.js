let rules = [];


async function loadRules() {

    const response =
        await fetch("rules.json");

    rules =
        await response.json();
}


function forwardChain(initialFacts) {
    let facts = new Set(initialFacts);
    let firedRules = [];
    let changed = true;

    while (changed) {
        changed = false;

        for (const rule of rules) {
            let satisfied = false;

            // Normal AND condition
            if (Array.isArray(rule.conditions)) {
                satisfied = rule.conditions.every(
                    condition => facts.has(condition)
                );
            }

            // OR condition
            else if (rule.conditions.OR) {
                satisfied = rule.conditions.OR.some(
                    condition => facts.has(condition)
                );
            }

            if (
                satisfied &&
                !facts.has(rule.conclusion)
            ) {
                facts.add(rule.conclusion);

                firedRules.push(rule.id);

                changed = true;
            }
        }
    }

    return {
        facts: [...facts],
        firedRules: firedRules
    };
}