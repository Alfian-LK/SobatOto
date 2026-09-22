let rules = [];


async function loadRules() {

    const response =
        await fetch("rules.json");

    rules =
        await response.json();
}


function forwardChain(initialFacts) {

    let facts =
        new Set(initialFacts);

    let firedRules = [];

    let changed = true;


    while (changed) {

        changed = false;


        for (const rule of rules) {

            const satisfied =
                rule.conditions.every(
                    condition =>
                        facts.has(condition)
                );


            if (
                satisfied &&
                !facts.has(rule.conclusion)
            ) {

                facts.add(
                    rule.conclusion
                );

                firedRules.push(
                    rule.id
                );

                changed = true;
            }
        }
    }


    return {

        facts: [...facts],

        firedRules: firedRules

    };
}
