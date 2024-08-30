import { Markup } from 'telegraf';

import { leaveSceneBtn } from '~/app/scene.buttons';

export enum LinkAction {
  ADD_LINK = 'ADD_LINK',
  CLEAR_ALL = 'CLEAR_ALL',
  REMOVE_LINK = 'REMOVE_LINK',
  VIEW_LINKS = 'VIEW_LINKS',
}

export enum PaginationAction {
  NEXT_PAGE = 'NEXT_PAGE',
  PREV_PAGE = 'PREV_PAGE',
}

export function addLinksBtn() {
  return Markup.button.callback('Добавить ссылку', LinkAction.ADD_LINK);
}

export function viewLinksBtn() {
  return Markup.button.callback(
    'Посмотреть добавленные ссылки',
    LinkAction.VIEW_LINKS
  );
}

export function deleteLinkBtn() {
  return Markup.button.callback('Удалить', LinkAction.REMOVE_LINK);
}

export function clearAllBtn() {
  return Markup.button.callback('Удалить все', LinkAction.CLEAR_ALL);
}

export function nextPageBtn() {
  return Markup.button.callback('Вперед', PaginationAction.NEXT_PAGE);
}

export function prevPageBtn() {
  return Markup.button.callback('Назад', PaginationAction.PREV_PAGE);
}

export function paginationKeyboard() {
  return Markup.inlineKeyboard([
    [prevPageBtn(), nextPageBtn()],
    [leaveSceneBtn('Выйти из режима просмотра')],
  ]);
}

export function maxLimitPaginationKeyboard() {
  return Markup.inlineKeyboard([
    [prevPageBtn()],
    [leaveSceneBtn('Выйти из режима просмотра')],
  ]);
}

export function minLimitPaginationKeyboard() {
  return Markup.inlineKeyboard([
    [nextPageBtn()],
    [leaveSceneBtn('Выйти из режима просмотра')],
  ]);
}

export function singlePagePaginationKeyboard() {
  return Markup.inlineKeyboard([leaveSceneBtn('Выйти из режима просмотра')]);
}

export function linkActionsKeyboard() {
  return Markup.inlineKeyboard([
    [addLinksBtn(), deleteLinkBtn()],
    [viewLinksBtn()],
  ]);
}
