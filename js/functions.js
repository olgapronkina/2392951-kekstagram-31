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

// const definePolindrom = (string) => {
//   const withoutSpacesString = string.replaceAll(' ', '');
//   const lowerCaseString = lowerCaseString.toLowerCase();

//   let newString = '';
//   for (index = lowerCaseString.length - 1; index >= 0; index--) {
//     newString += lowerCaseString[index];
//   }
//   if (newString === lowerCaseString) {
//     return true;
//   }
//   return false;
// };

// definePolindrom();
// console.log(definePolindrom('топот'));
// console.log(definePolindrom('ДовОд'));
// console.log(definePolindrom('Кекс'));

/**********************************************************/
// const isPalindrome = (string) => {
//   string = string.replaceAll(' ', '').toLowerCase();

//   let reversed = '';

//   for (let i = string.length - 1; i >= 0; i--) {
//     reversed += string[i];
//   }

//   return string === reversed;
// };

// isPalindrome();

const workingHours = (startWork, endWork, startMeeting, durationMeeting) => {
  // начало рабочего дня
  const startWorkData = startWork.split(':');
  const startWorkHours = parseInt(startWorkData[0], 10);
  const startWorkMinutes = parseInt(startWorkData[1], 10);
  // конец рабочего дня
  const endWorkData = endWork.split(':');
  const endtWorkHours = parseInt(endWorkData[0], 10);
  const endWorkMinutes = parseInt(endWorkData[1], 10);
  // начало встречи
  const startMeetingHours = parseInt(startMeeting[0], 10);
  const startMeetingMinutes = parseInt(startMeeting[1], 10);

  // конец встречи
  let endMeetingHours = Math.floor(
    (startMeetingHours * 60 + startMeetingMinutes + durationMeeting) / 60
  );
  let endMeetingMinutes = (durationMeeting + startMeetingMinutes) % 60;

  if (startWork === startMeeting || endWork - startWork >= durationMeeting) {
    return true;
  }
  return false;
};

console.log(
  workingHours('08:00', '17:30', '14:00', 90), // true
  workingHours('8:0', '10:0', '8:0', 120), // true
  workingHours('08:00', '14:30', '14:00', 90), // false
  workingHours('14:00', '17:30', '08:0', 90), // false
  workingHours('8:00', '17:30', '08:00', 900) // false;
);
