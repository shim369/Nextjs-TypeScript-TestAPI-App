import { render, screen, fireEvent } from '@testing-library/react';
import { Mask } from './Mask';

test('Mask component renders correctly and onClick is called', () => {
    // Arrange
    const onClickMock = jest.fn();
  
    // Act
    render(<Mask onClick={onClickMock} />);
    const maskElement = screen.getByTestId('mask');
  
    // Assert
    expect(maskElement).toBeTruthy(); // マスク要素が存在することを確認
  
    // Act: マスク要素をクリック
    fireEvent.click(maskElement);
  
    // Assert: onClick モック関数が呼ばれたことを確認
    expect(onClickMock).toHaveBeenCalled();
  });
  