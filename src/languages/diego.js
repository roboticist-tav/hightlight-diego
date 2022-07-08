/*
Language: Diego
Description: Diego is a instructional programming languages, predominantly used in robotics and IoT
Author: Tavis Pitt <diego.for.robots@gmail.com>
Website: https://www.diego.dev
*/

/** @type LanguageFn */
export default function(hljs) {
  
  const IDENT_WITH_BRACKETS = /[a-zA-Z][a-zA-Z_<>0-9]*/

  // Keywords
  const DIEGO_VERB_KEYWORDS = [
    'add', 'alert', 'ask', 'begin', 'calc', 'call', 'follow', 'go', 'goto', 'kill',
    'murder', 'lead', 'load', 'msg', 'poll', 'set', 'study', 'tail', 'unload',
    'with'
  ];
  const DIEGO_OBJECT_KEYWORDS = [
    '_computer', '_counter', '_distan', '_distance', '_funct', '_function', '_goal',
    '_instruct', '_instruction', '_msg', '_messsage', '_namespace', '_ns', '_payload',
    '_pload', '_point', '_printer', '_ptr', '_process', '_robot', '_route', '_sensor',
    '_thing', '_thingy', '_vector', '_verb', '_way', '_waypoint', '_wp', '_world'
  ];  
  const DIEGO_SETTER_OBJECT_KEYWORDS = [
    '_concord', '_consens', '_consensus', '_decisiven', '_decisiveness'
  ];
  const KEYWORDS = {
    keyword: DIEGO_VERB_KEYWORDS.concat(DIEGO_OBJECT_KEYWORDS).concat(DIEGO_SETTER_OBJECT_KEYWORDS),
    type: DIEGO_DATATYPES,
    literal: DIEGO_LITERALS
  };

  // Types
  const DIEGO_DATATYPES = [
      'bool', 'int', 'float', 'string', 'str'
  ];

  // Literals
  const DIEGO_LITERALS = [
      'false' , 'null' ,  'true'
  ];

  // Strings
  const DIEGO_STRING_MODE = {
    className: 'string',
    begin: '(',
    end: ')',
    illegal: '.',
    relevance: 10
  };
  const DEIGO_ANTI_STRING_MODE = {
    scope: 'string',
    begin: '"',
    end: '"',
    relevance: 0
  }
 
  const OPERATORS = {
      begin: /(?<!\w)/.source +
          '(' + [
            '&&', '\\|\\|', '<==>', '==>', '<==', '==', '!=', '!', '>', '<', '>=', 
            '<=', '\\+', '-', '\\*', '/', '%', '>>', '<<', '&', '\\|', '\\^', '!!',
            'in', '!in', ':=', ':\\|', '::', '='
          ].join('|') + 
          ')' + 
          /(?!\w)/.source,
      scope: 'operator',
      relevance: 0
  };

  return {
      name: "Diego",
      case_insensitive: false,
      keywords: KEYWORDS,
      contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.NUMBER_MODE,
          hljs.COMMENT(
              '/\\*', // begin
              '\\*/', // end
              {
                  contains: [
                  {
                      scope: 'doctag', begin: '@\\w+',
                      relevance: 0
                  }
                  ]
              },
          ),
          TYPE_FOR_IDENTIFIERS,
          OPERATORS,
          {
              begin: '\\b(' + DIEGO_DATATYPES.join('|') + ')\\b' + IDENT_WITH_BRACKETS.source,
              scope: 'type'
          },
          {
              begin: [
                  /\b(class|module|trait)\b/,
                  /\s*/,
                  hljs.IDENT_RE
              ],
              scope: {
                  1: 'keyword',
                  3: 'title.class'
              },
              relevance: 0
          },
          {
              begin: [
                  '(?:' + hljs.IDENT_RE + '\\s+)', 
                  hljs.IDENT_RE, 
                  /\s*(?=\(|<)/], 
              scope: {
                  2: 'title.function'
              }, 
              keywords: KEYWORDS, 
              contains: [
              {
                  begin: /</,
                  end:  />/,
                  scope: 'type',
                  relevance: 0
              },
              {
                  scope: 'params', 
                  begin: /\(/,
                  end: /\)/, 
                  keywords: KEYWORDS, 
                  relevance: 0,
                  contains: [hljs.QUOTE_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, TYPE_FOR_IDENTIFIERS, OPERATORS, hljs.NUMBER_MODE]
              }, 
              hljs.C_LINE_COMMENT_MODE, 
              hljs.C_BLOCK_COMMENT_MODE,
              DIEGO_STRING_MODE,
              DEIGO_ANTI_STRING_MODE]
          }    
      ]
  };
}