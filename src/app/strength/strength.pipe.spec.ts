import { StrengthPipe } from './strength.pipe';

describe('Strength', () => {
    it('should display weak if strength is 5', () => {
        // Arrange
        const pipe = new StrengthPipe();

        // Act
        const val = pipe.transform(5);

        // Assert
        expect(val).toEqual('5 (weak)');
    });

    it('should display strong if strength is 10', () => {
        // Arrange
        const pipe = new StrengthPipe();

        // Act
        const val = pipe.transform(10);

        // Assert
        expect(val).toEqual('10 (strong)');
    });
});
