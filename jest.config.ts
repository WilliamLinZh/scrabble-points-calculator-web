module.exports = {
    roots: ['<rootDir>'],
    testEnvironment: 'jsdom',
    // A map from regular expressions to module names that allow to stub out resources, like images or styles with a single module
    moduleNameMapper: {
        '\\.(css|scss)': 'identity-obj-proxy', // tell Jest to mock this object as imported CSS modules so that the react component testing can work
    },
    testRegex: '^.+\\.test\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      },
    testTimeout: 10000,
};