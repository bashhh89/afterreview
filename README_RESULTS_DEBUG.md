# AI Scorecard Results Page Debug Guide

This guide provides troubleshooting instructions for the AI Scorecard results page, including common issues and solutions.

## Common Issues and Solutions

### 1. Empty or Missing Results Content

If the results page is showing "N/A Your Organization is Developing in AI Maturity" or "tier couldn't be precisely determined", check the following:

- **Data Storage**: Verify that the report data is properly stored in Firestore under the 'scorecardReports' collection
- **Report ID**: Confirm the correct reportId is being used (check URL parameters and session/local storage)
- **Markdown Content**: Check if reportMarkdown is available in the document
- **Tier Extraction**: Verify that the tier information is being extracted properly

### 2. Missing Strengths, Weaknesses, or Actions

If specific sections of the report (strengths, weaknesses, or action items) are empty:

- Check that the reportMarkdown contains properly formatted sections with headings
- Verify the extraction functions in NewResultsPage.tsx are finding the appropriate patterns
- Ensure there are bullet points (using - or * format) in the appropriate sections

## Development Features

### Using Mock Data for Development

To facilitate development without relying on API calls or Firestore, we've implemented a mock data system:

1. **Enable Mock Data Mode**:
   - In `app/scorecard/results/NewResultsPage.tsx`, set `USE_MOCK_DATA = true`
   - Mock data is defined in `lib/mockData.ts`

2. **Choose a Test Tier**:
   - Set `MOCK_TIER_FOR_DEV` to one of: "leader", "enabler", or "dabbler"
   - This will load the corresponding mock report

3. **Available Mock Reports**:
   - `mockLeaderReport`: Complete "Leader" tier sample with all sections
   - `mockEnablerReport`: Complete "Enabler" tier sample with all sections
   - `mockDabblerReport`: Complete "Dabbler" tier sample with all sections
   - Each mock report includes realistic reportMarkdown and question-answer history

4. **Customizing Mock Data**:
   - Edit the mock report data in `lib/mockData.ts` to test different scenarios
   - You can modify the reportMarkdown to test the section extraction functions

## Data Flow and Storage

### Primary Data Sources (in order of priority)

1. **Firestore**: `scorecardReports` collection with the reportId document
2. **Session Storage**: Backup storage of report data
3. **Local Storage**: Secondary backup storage 

### Critical Fields

- `reportMarkdown`: Contains the full report text with sections
- `tier` / `userAITier` / `aiTier`: Multiple field names checked for tier information
- `questionAnswerHistory`: Array of Q&A pairs from the assessment
- `leadName` / `userName`: User identification

## Debugging Tools

### Console Logging

The results page includes extensive console logging for debugging:

- **Data Retrieval**: Logs attempts to retrieve data from different sources
- **Tier Extraction**: Logs the process of extracting tier information
- **Section Extraction**: Logs the extraction of strengths, weaknesses, and actions

### Manual Verification

You can manually verify the stored data:

1. Open browser dev tools (F12)
2. Check Firestore using the Firebase console
3. Verify session/local storage in the Application tab
4. View console logs in the Console tab

## Deployment Checklist

Before deploying to production:

1. Set `USE_MOCK_DATA = false` in NewResultsPage.tsx
2. Verify all extraction functions work with real data
3. Test the fallback mechanisms for tier determination
4. Clear any debug console.log statements (optional)

## Emergency Fallbacks

If all data retrieval methods fail:

1. The page will try to retry the data fetch once after a 3-second delay
2. If still unsuccessful, it will display a user-friendly error message
3. The code includes fallback extraction methods to find content even with irregular formatting 