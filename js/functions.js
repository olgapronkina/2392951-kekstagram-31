/*Функция для проверки длины строки.
Она принимает строку и максимальную длину
возвращает true, если строка меньше или равна указанной длине,
возвращает false, если строка длиннее.
Эта функция нам пригодится для валидации формы. */

const controlStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};
controlStringLength('проверяемая строка', 20);

// праверяет строку с максимальной длиной 20
// console.log(controlStringLength('проверяемая строка', 20));
// console.log(controlStringLength('проверяемая строка', 18));
// console.log(controlStringLength('проверяемая строка', 10));

/*Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево.*/

const definePolindrom = (string) => {
  const withoutSpacesString = string.replaceAll(' ', '');
  const lowerCaseString = lowerCaseString.toLowerCase();

  let newString = '';
  for (index = lowerCaseString.length - 1; index >= 0; index--) {
    newString += lowerCaseString[index];
  }
  if (newString === lowerCaseString) {
    return true;
  }
  return false;
};

definePolindrom();
// console.log(definePolindrom('топот'));
// console.log(definePolindrom('ДовОд'));
// console.log(definePolindrom('Кекс'));
