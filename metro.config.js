// const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);



const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  resolver: {
    // Ignore temporary build files that cause ENOENT errors
    blockList: [
      /.*\/android\/build\/.*/,
      /.*\/node_modules\/.*\/android\/.cxx\/.*/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);