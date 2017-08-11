import reducer, { calculate, CALCULATE_SUCCESS, INITIAL_STATE } from "../../ducks/interestCalculator";
import createStore from "../../utils/reduxStore";
const resultFixture = "fake-data-result";

const mockApi = {
    calculate: () => Promise.resolve({ data: resultFixture })
};

const store = createStore({ api: mockApi });

describe("interestCalculator", () => {
    describe("actions", () => {
        describe("calculate", () => {
            it("should handle calculate", () => {
                const expectedResult = {
                    type: CALCULATE_SUCCESS,
                    calculationResult: { data: resultFixture }
                };

                return store.dispatch(calculate()).then(res => {
                    expect(res).toEqual(expectedResult);
                });
            });
        });
    });

    describe("reducer", () => {
        it("should handle CALCULATE_SUCCESS", () => {

            const calculationResult = ({
                calculationResult: resultFixture
            });
            const expected = {...INITIAL_STATE, calculationResult };            

            expect(reducer(undefined, { type: CALCULATE_SUCCESS, calculationResult })).toEqual(expected);
        });
    });
});
