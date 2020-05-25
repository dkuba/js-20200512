export default class NotificationMessage {
    element; // HTMLElement;
    // button; // больше не используется
    // timerId; // не требуется

    constructor(
        showText = 'Hello World!',
        {duration = 2000, type = 'success'} = {}
    ) {
        // @param type = ['success' | 'error']
        this.showText = showText;
        this.duration = duration;
        this.durationSeconds = duration / 1000;
        this.type = type;
        // this.button = document.getElementById('btn1');

        this.render();
        // this.initEventListeners(); // не требуется
    }

    show (node = document.body) {
        node.append(this.element);
        // как this остается в контексте класса внутри ф-ии remove() при ее выполнении внутри setTimeout?
        setTimeout(() => this.remove(), this.duration);
        return this.element;
    }

    /**
     * создается одинарное событие на кнопку, удаляющее только что созданный элемент
     * но лучше не привязываться к какой-то конкретной кнопке
     * initEventListeners() {
     *  if (this.button) {
     *      this.button.addEventListener(
     *          'click', 
     *          () => this.remove(),
     *          { once: true } //выполнится один раз
     *      );
     *  }
     * }
     */


    get template() {
        return `
          <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
              ${this.showText}
            </div>
          </div>
        `;
    }

    render() {
        // решил, что будет неправильно размещать всю конструкцию сообщение внутри простого div
        const element = document.createElement('div');
        element.className = `notification ${this.type}`;
        element.setAttribute('style', `--value:${this.durationSeconds}s`);
        element.innerHTML = this.template;
        
        this.element = element;
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.remove();
    }
}
