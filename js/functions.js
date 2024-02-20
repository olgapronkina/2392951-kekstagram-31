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
controlStringLength();

// праверяет строку с максимальной длиной 20
// console.log(controlStringLength('проверяемая строка', 20));
// console.log(controlStringLength('проверяемая строка', 18));
// console.log(controlStringLength('проверяемая строка', 10));
