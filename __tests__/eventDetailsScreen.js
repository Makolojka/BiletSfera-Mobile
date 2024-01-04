const renderText = (eventDetails, showFullText) => {
    const additionalText = eventDetails?.additionalText || '';
    if (showFullText || additionalText.length <= 200) {
        return additionalText;
    } else {
        return additionalText.slice(0, 200) + '...';
    }
};

describe('renderText method', () => {
    test('returns additionalText truncated to 200 characters followed by ellipsis if length is greater than 200', () => {
        const eventDetails = {
            additionalText: 'This is a longer text that exceeds 200 characters for testing purposes.' +
                'This is a longer text that exceeds 200 characters for testing purposes.' +
                'This is a longer text that exceeds 200 characters for testing purposes.' +
                'This is a longer text that exceeds 200 characters for testing purposes.' +
                'This is a longer text that exceeds 200 characters for testing purposes.' +
                'This is a longer text that exceeds 200 characters for testing purposes.' +
                'This is a longer text that exceeds 200 characters for testing purposes.',
        };
        const showFullText = false;

        const expected = 'This is a longer text that exceeds 200 characters for testing purposes.This is a longer text that exceeds 200 characters for testing purposes.This is a longer text that exceeds 200 characters for test...';

        expect(renderText(eventDetails, showFullText)).toEqual(expected);
    });

    test('returns additionalText if showFullText is true', () => {
        const eventDetails = {
            additionalText: 'Short text within 200 characters.',
        };
        const showFullText = true;

        expect(renderText(eventDetails, showFullText)).toEqual(eventDetails.additionalText);
    });

    test('returns additionalText if length is less than or equal to 200', () => {
        const eventDetails = {
            additionalText: 'Short text within 200 characters.',
        };
        const showFullText = false;

        expect(renderText(eventDetails, showFullText)).toEqual(eventDetails.additionalText);
    });

    test('returns empty string if additionalText is undefined', () => {
        const eventDetails = {
            additionalText: undefined,
        };
        const showFullText = false;

        expect(renderText(eventDetails, showFullText)).toEqual('');
    });
});