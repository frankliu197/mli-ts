# Math Latin Input (MLI)

**TLDR:** MLI helps simplify the process of finding and typing special characters like mathematical symbols, Latin, or Greek characters, which are not easily accessible on conventional keyboards.

Currently available online: [MLI Tool](https://frankliu197.github.io/mli-ts)

### How to Use
You can search for a character by opening the dropdown with the **PageDown** key.

![MLI Dropdown](dropdown.png)

There are two search methods:
- **Keyword Search:** Look for characters by name.
  - Example: Searching "arrow" will suggest characters like *LEFT RIGHT ARROW* (↔).
- **Composition Search:** Search based on visual similarity to a sequence of characters.
  - Example: Typing "--", "=/" or ">=/" suggests symbols like "=", "≠", "≩", respectively.

With over 10,000 characters supported, multiple pages of results are common. Use **Shift + ArrowDown** or **Shift + ArrowUp** to navigate through suggestions, or scroll through the UI. 

### Symbol Prioritization
The order of symbol recommendations is based on three main factors:
1. **Search Term Similarity:**
   - For keyword searches: Searching "Equa" will match better with *equal* than *equality*.
   - For composition searches: Typing "--" will match better with "=" than "≠".
  
2. **Search Specificity:**
   - Example: Searching for "le" can match both *letter* and *less* (for math symbols like "<"). Since *less* is more specific and matches fewer symbols, it would be prioritized over *letter*.

3. **Usage Patterns:**
   - The tool tracks user preferences to predict and prioritize commonly chosen symbols.

### Recommendation Algorithm
MLI uses a B+ Tree for efficient symbol searches. For more detailed technical information, check out the formal [documentation](https://docs.google.com/document/d/1m_3ldCh2-jJ-W27MyO0_hXzsXXpakwmHM67S0z2FcoQ/edit?usp=sharing).

