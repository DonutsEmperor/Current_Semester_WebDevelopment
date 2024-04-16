import {parseDateFromString} from './additional';

export function groupBy(): void {
    let selectedGroup = (document.getElementById('listSelector')as HTMLSelectElement).value;
    let lists = document.querySelectorAll('.list > div')as NodeListOf<HTMLElement>;

    lists.forEach((list) => {
        let listId = list.getAttribute('id');
        if (selectedGroup === 'all' || listId === selectedGroup) {
            list.style.display = 'flex';
        } else {
            list.style.display = 'none';
        }
    });
}

export function orderBy(): void {
    let selectedGroup = (document.getElementById('orderSelector') as HTMLSelectElement).value;
    let uls = document.querySelectorAll('ul');

    uls.forEach(ul => {
        let liElements = Array.from(ul.getElementsByTagName('li'));
    
        switch (selectedGroup) {
            case 'dataDesc':
                liElements.sort((a, b) => {
                    let dateA = parseDateFromString(a.querySelector('sub')?.textContent ?? '');
                    let dateB = parseDateFromString(b.querySelector('sub')?.textContent ?? '');
                    return dateB.getTime() - dateA.getTime();
                });
                break;
            case 'dataAsc':
                liElements.sort((a, b) => {
                    let dateA = parseDateFromString(a.querySelector('sub')?.textContent ?? '');
                    let dateB = parseDateFromString(b.querySelector('sub')?.textContent ?? '');
                    return dateA.getTime() - dateB.getTime();
                });
                break;
            case 'textDesc':
                liElements.sort((a, b) => {
                    let textA = a.querySelector('h4')!.textContent!;
                    let textB = b.querySelector('h4')!.textContent!;
                    return textB.localeCompare(textA, 'en', { sensitivity: 'base' });
                });
                break;
            case 'textAsc':
                liElements.sort((a, b) => {
                    let textA = a.querySelector('h4')!.textContent!;
                    let textB = b.querySelector('h4')!.textContent!;
                    return textA.localeCompare(textB, 'en', { sensitivity: 'base' });
                });
                break;
            default:
                break;
        }

        ul.innerHTML = '';
        liElements.forEach(li => ul.appendChild(li));
    });
}