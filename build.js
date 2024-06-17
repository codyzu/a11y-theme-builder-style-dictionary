import { registerTransforms } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { formattedVariables, fileHeader } from 'style-dictionary/utils';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
registerTransforms(StyleDictionary);

function getFormattingCloneWithoutPrefix(formatting) {
  const formattingWithoutPrefix = structuredClone(formatting) ?? {};
  delete formattingWithoutPrefix.prefix;
  return formattingWithoutPrefix;
}

StyleDictionary.registerFormat({
  name: 'custom/css',
  format: myFormat
//   async ({ dictionary, options = {}, file }) => {
//     const selector = options.selector ? options.selector : `:root`;
//     const { outputReferences, outputReferenceFallbacks, usesDtcg, formatting } = options;
//     const header = await fileHeader({
//       file,
//       formatting: getFormattingCloneWithoutPrefix(formatting),
//     });

//     const groupedTokens = {};
//     dictionary.allTokens.forEach(token => {
//       let category = '_';
//       const match = /my-background\/(?<filename>.+?)\.json/g.exec(token.filePath);
//       if (match && match.groups.filename) {
//         category = match.groups.filename;
//       }
//       if (!groupedTokens[category]) {
//         groupedTokens[category] = [];
//       }
//       groupedTokens[category].push(token)
//     });

//     console.log('grouped', groupedTokens)

//     const formattedVarOptions = {
//       format: 'css',
//       dictionary,
//       outputReferences,
//       outputReferenceFallbacks,
//       formatting,
//       usesDtcg,
//     };


//     return `${header}
// ${groupedTokens._ ? `${selector} {
// ${formattedVariables({
//   ...formattedVarOptions,
//   dictionary: {
//     ...formattedVarOptions.dictionary,
//     allTokens: groupedTokens._,
//   }
// })}
// }` : ''}

// ${Object.entries(groupedTokens)
//   .filter(entry => entry[0] !== '_')
//   .map(([key, tokens]) => `[data-background="${key}"] {
// ${formattedVariables({
//   ...formattedVarOptions,
//   dictionary: {
//     ...formattedVarOptions.dictionary,
//     allTokens: tokens,
//   }
// })}  
// }`).join('\n\n')}\n`;
//   }
});

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'], // <-- make sure to have this match your token files!!!
  preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // <-- add a token name transform for generating token names, default is camel
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'custom/css',
        },
      ],
    },
}
}, {
  // verbosity: 'verbose'
});



async function myFormat({ dictionary, options = {}, file }) {
  const selector = options.selector ? options.selector : `:root`;
  const { outputReferences, outputReferenceFallbacks, usesDtcg, formatting } = options;
  const header = await fileHeader({
    file,
    formatting: getFormattingCloneWithoutPrefix(formatting),
  });

  const groupedTokens = {};
  dictionary.allTokens.forEach(token => {
    let category = '_';
    const match = /my-backgrounds\/(?<filename>.+?)\.json/g.exec(token.filePath);

    if(token.filePath.includes('my-background')) {
      console.log(token, match);
    }

    if (match && match.groups.filename) {
      category = match.groups.filename;
      console.log('cat', category)
    }
    if (!groupedTokens[category]) {
      groupedTokens[category] = [];
    }
    groupedTokens[category].push(token)
  });

  console.log('grouped', Object.keys(groupedTokens))

  const formattedVarOptions = {
    format: 'css',
    dictionary,
    outputReferences,
    outputReferenceFallbacks,
    formatting,
    usesDtcg,
  };


  return `${header}
${groupedTokens._ ? `${selector} {
${formattedVariables({
...formattedVarOptions,
dictionary: {
  ...formattedVarOptions.dictionary,
  allTokens: groupedTokens._,
}
})}
}` : ''}

${Object.entries(groupedTokens)
.filter(entry => entry[0] !== '_')
.map(([key, tokens]) => `[data-background="${key}"] {
${formattedVariables({
...formattedVarOptions,
dictionary: {
  ...formattedVarOptions.dictionary,
  allTokens: tokens,
}
})}  
}`).join('\n\n')}\n`;

}

// console.log('sd', sd)

sd.cleanAllPlatforms();
sd.buildAllPlatforms();
// sd.buildPlatform('css');
