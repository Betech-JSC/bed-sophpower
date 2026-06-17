/**
 * Simple client-side translation utility using Google Translate API
 */

/**
 * Translates a plain text string.
 */
export async function translateSingle(text, from = 'vi', to = 'en') {
  if (!text || !text.trim()) return '';
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`
    );
    if (!response.ok) throw new Error('Translation API error');
    const data = await response.json();
    if (data && data[0]) {
      return data[0].map(item => item[0]).join('');
    }
    return text;
  } catch (error) {
    console.error('Translation failed:', error);
    return text;
  }
}

/**
 * Translates an HTML string by parsing DOM and translating only the text nodes.
 * This prevents the translation engine from breaking or translating tags/attributes.
 */
export async function translateHtml(html, from = 'vi', to = 'en') {
  if (!html || !html.trim()) return '';
  
  // If it's not containing HTML tags, translate directly
  if (!html.includes('<') || !html.includes('>')) {
    return translateSingle(html, from, to);
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Find all text nodes with content
    const textNodes = [];
    const walk = (node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
        textNodes.push(node);
      } else {
        for (let child of node.childNodes) {
          walk(child);
        }
      }
    };
    walk(doc.body);

    // Translate all text nodes in parallel
    await Promise.all(
      textNodes.map(async (node) => {
        const val = node.nodeValue;
        const leadingWs = val.match(/^\s*/)[0];
        const trailingWs = val.match(/\s*$/)[0];
        const cleanText = val.trim();
        
        if (cleanText) {
          const translated = await translateSingle(cleanText, from, to);
          node.nodeValue = leadingWs + translated + trailingWs;
        }
      })
    );

    return doc.body.innerHTML;
  } catch (error) {
    console.error('HTML translation failed, fallback to single translation:', error);
    return translateSingle(html, from, to);
  }
}

/**
 * Utility to translate values recursively (string, array of strings, or nested objects)
 */
export async function translateValue(val, from = 'vi', to = 'en') {
  if (!val) return val;
  if (typeof val === 'string') {
    return translateHtml(val, from, to);
  }
  if (Array.isArray(val)) {
    return Promise.all(val.map(item => translateValue(item, from, to)));
  }
  if (typeof val === 'object') {
    const res = {};
    for (let k in val) {
      res[k] = await translateValue(val[k], from, to);
    }
    return res;
  }
  return val;
}
