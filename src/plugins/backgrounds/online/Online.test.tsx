// Test the URL refresh logic for the Online background component
describe("Online URL refresh logic", () => {
  const refreshInterval = 15 * 60 * 1000; // 15 minutes in milliseconds

  // Helper function to create refreshed URL (extracted from component logic)
  const createRefreshedUrl = (url: string, timestamp: number): string => {
    if (!url) return url;

    const refreshKey = Math.floor(timestamp / refreshInterval);
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}_refresh=${refreshKey}`;
  };

  it("appends refresh parameter to URL without query params", () => {
    const testUrl = "https://example.com/image.jpg";
    const timestamp = 1640995200000; // 2022-01-01 00:00:00 UTC

    const refreshKey = Math.floor(timestamp / refreshInterval);
    const expectedUrl = `${testUrl}?_refresh=${refreshKey}`;
    const actualUrl = createRefreshedUrl(testUrl, timestamp);

    expect(actualUrl).toBe(expectedUrl);
  });

  it("appends refresh parameter with & when URL already has query params", () => {
    const testUrl = "https://example.com/image.jpg?size=large";
    const timestamp = 1640995200000; // 2022-01-01 00:00:00 UTC

    const refreshKey = Math.floor(timestamp / refreshInterval);
    const expectedUrl = `${testUrl}&_refresh=${refreshKey}`;
    const actualUrl = createRefreshedUrl(testUrl, timestamp);

    expect(actualUrl).toBe(expectedUrl);
  });

  it("changes refresh key every 15 minutes", () => {
    const testUrl = "https://example.com/image.jpg";
    const timestamp1 = 1640995200000; // 2022-01-01 00:00:00 UTC
    const timestamp2 = timestamp1 + refreshInterval; // 15 minutes later

    const url1 = createRefreshedUrl(testUrl, timestamp1);
    const url2 = createRefreshedUrl(testUrl, timestamp2);

    const refreshKey1 = Math.floor(timestamp1 / refreshInterval);
    const refreshKey2 = Math.floor(timestamp2 / refreshInterval);

    expect(refreshKey2).toBe(refreshKey1 + 1);
    expect(url1).toBe(`${testUrl}?_refresh=${refreshKey1}`);
    expect(url2).toBe(`${testUrl}?_refresh=${refreshKey2}`);
    expect(url1).not.toBe(url2);
  });

  it("maintains same refresh key within 15-minute window", () => {
    const testUrl = "https://example.com/image.jpg";
    const timestamp1 = 1640995200000; // 2022-01-01 00:00:00 UTC
    const timestamp2 = timestamp1 + (10 * 60 * 1000); // 10 minutes later (within same window)

    const url1 = createRefreshedUrl(testUrl, timestamp1);
    const url2 = createRefreshedUrl(testUrl, timestamp2);

    const refreshKey1 = Math.floor(timestamp1 / refreshInterval);
    const refreshKey2 = Math.floor(timestamp2 / refreshInterval);

    expect(refreshKey2).toBe(refreshKey1); // Should be the same
    expect(url1).toBe(url2); // URLs should be identical
  });

  it("handles empty URL", () => {
    const timestamp = 1640995200000;
    const result = createRefreshedUrl("", timestamp);

    expect(result).toBe("");
  });

  it("handles URL with multiple query parameters", () => {
    const testUrl = "https://example.com/image.jpg?size=large&format=webp";
    const timestamp = 1640995200000;

    const refreshKey = Math.floor(timestamp / refreshInterval);
    const expectedUrl = `${testUrl}&_refresh=${refreshKey}`;
    const actualUrl = createRefreshedUrl(testUrl, timestamp);

    expect(actualUrl).toBe(expectedUrl);
  });

  it("refresh key increments correctly across different time periods", () => {
    const testUrl = "https://example.com/image.jpg";
    const baseTimestamp = 1640995200000; // 2022-01-01 00:00:00 UTC

    // Test multiple 15-minute intervals
    for (let i = 0; i < 5; i++) {
      const timestamp = baseTimestamp + (i * refreshInterval);
      const url = createRefreshedUrl(testUrl, timestamp);
      const expectedRefreshKey = Math.floor(timestamp / refreshInterval);

      expect(url).toBe(`${testUrl}?_refresh=${expectedRefreshKey}`);
    }
  });
});
