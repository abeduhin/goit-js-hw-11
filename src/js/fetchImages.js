export const fetchImages = async (inputValue, pageNr) => {
  // Створюємо асінхронну функцію для запита на сервер, передаємо два параметра inputValue - слова для запиту, що ввів користувач та pageNr - індівідуальний індефікатор
    return await fetch(
      `https://pixabay.com/api/?key=31796382-452a69c0ad3be9a5c3a287f3e&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`
    )
    // Відправляємо на сервер GET-запит без тіла метод fetch(), у відповіді бекенда отримуємо:
    // Список параметрів рядка запиту
    // key - твій унікальний ключ доступу до API. 31796382-452a69c0ad3be9a5c3a287f3e
    // q - термін для пошуку. Те, що буде вводити користувач.${inputValue}
    // image_type - тип зображення. На потрібні тільки фотографії, тому постав значення photo.
    // orientation - орієнтація фотографії. Постав значення horizontal.
    // safesearch - фільтр за віком. Постав значення true.
    // per_page - кількість фото на сторинці. per_page=40
    // page - індефікатор
    
      .then(async response => {
        if (!response.ok) {
          if (response.status === 404) {
            return [];
          }
          throw new Error(response.status);
        }
        return await response.json();
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Обробка помилок . Якщо проміс виконався. але відповідь не успішна, то тоді при умові відповіді статус -404 виводимо пустий масив, інший статус - повертає певні помилки, як визначено у значенні повідомлення, яке передається як аргумент (throw new Error) - інше виводимо відповідь. Якщо проміс не виконався - метод catch.
  
  