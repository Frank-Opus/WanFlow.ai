'use client';

import type { PlatformProjectBundle } from '@/lib/platform-types';
import type { BenchmarkOpsConsoleCopy, BenchmarkOpsItemDraft, BenchmarkOpsViewIds } from '@dataflow/proofbench/lib/view-model';

type ItemsPanelProps = {
  selectedBundle: PlatformProjectBundle | null;
  selectedItemId: string;
  itemForm: BenchmarkOpsItemDraft;
  busyKey: string | null;
  ids: Pick<
    BenchmarkOpsViewIds,
    'itemTitle' | 'itemPrompt' | 'itemAnswer' | 'itemSubject' | 'itemGradeLevel' | 'itemDifficulty' | 'itemType' | 'itemTags' | 'itemNotes'
  >;
  copy: Pick<
    BenchmarkOpsConsoleCopy,
    | 'emptyItems'
    | 'draftItemTitle'
    | 'draftItemPrompt'
    | 'draftItemAnswer'
    | 'subject'
    | 'gradeLevel'
    | 'difficulty'
    | 'itemType'
    | 'tags'
    | 'notes'
    | 'createItem'
  >;
  onSelectItem: (itemId: string) => void;
  onUpdateItemForm: (patch: Partial<BenchmarkOpsItemDraft>) => void;
  onCreateItem: () => void;
};

export default function ItemsPanel({
  selectedBundle,
  selectedItemId,
  itemForm,
  busyKey,
  ids,
  copy,
  onSelectItem,
  onUpdateItemForm,
  onCreateItem,
}: ItemsPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.94fr]">
      <div className="surface-muted rounded-[24px] p-3">
        <div className="max-h-[28rem] space-y-3 overflow-y-auto pr-1">
          {(selectedBundle?.problemItems ?? []).length === 0 && (
            <div className="rounded-[26px] border border-dashed border-[rgba(25,40,72,0.14)] px-5 py-6 text-sm text-[var(--mist)]">
              {copy.emptyItems}
            </div>
          )}
          {(selectedBundle?.problemItems ?? []).map((item) => {
            const active = item.id === selectedItemId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectItem(item.id)}
                aria-pressed={active}
                className={[
                  'w-full rounded-[20px] border px-5 py-5 text-left transition',
                  active
                    ? 'border-[rgba(15,118,110,0.2)] bg-[rgba(15,118,110,0.08)] shadow-[0_12px_28px_rgba(15,118,110,0.08)]'
                    : 'border-[rgba(25,40,72,0.08)] bg-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.94)]',
                ].join(' ')}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-ink">{item.title}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--mist)]">{item.prompt}</p>
                  </div>
                  <div className="control-chip-sm rounded-[12px] px-3 py-1 text-xs uppercase tracking-[0.18em]">
                    {item.metadata.subject}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="quiet-card rounded-[24px] p-5">
        <div className="grid gap-3">
          <div className="space-y-2">
            <label htmlFor={ids.itemTitle} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.draftItemTitle}
            </label>
            <input
              id={ids.itemTitle}
              value={itemForm.title}
              onChange={(event) => onUpdateItemForm({ title: event.target.value })}
              className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
              placeholder={copy.draftItemTitle}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={ids.itemPrompt} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.draftItemPrompt}
            </label>
            <textarea
              id={ids.itemPrompt}
              value={itemForm.prompt}
              onChange={(event) => onUpdateItemForm({ prompt: event.target.value })}
              className="input-shell min-h-28 w-full rounded-2xl px-4 py-3 text-sm"
              placeholder={copy.draftItemPrompt}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={ids.itemAnswer} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.draftItemAnswer}
            </label>
            <textarea
              id={ids.itemAnswer}
              value={itemForm.answerKey}
              onChange={(event) => onUpdateItemForm({ answerKey: event.target.value })}
              className="input-shell min-h-20 w-full rounded-2xl px-4 py-3 text-sm"
              placeholder={copy.draftItemAnswer}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor={ids.itemSubject} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.subject}
              </label>
              <input
                id={ids.itemSubject}
                value={itemForm.subject}
                onChange={(event) => onUpdateItemForm({ subject: event.target.value })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                placeholder={copy.subject}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={ids.itemGradeLevel} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.gradeLevel}
              </label>
              <input
                id={ids.itemGradeLevel}
                value={itemForm.gradeLevel}
                onChange={(event) => onUpdateItemForm({ gradeLevel: event.target.value })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                placeholder={copy.gradeLevel}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={ids.itemDifficulty} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.difficulty}
              </label>
              <input
                id={ids.itemDifficulty}
                value={itemForm.difficulty}
                onChange={(event) => onUpdateItemForm({ difficulty: event.target.value })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                placeholder={copy.difficulty}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor={ids.itemType} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
                {copy.itemType}
              </label>
              <input
                id={ids.itemType}
                value={itemForm.itemType}
                onChange={(event) => onUpdateItemForm({ itemType: event.target.value })}
                className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
                placeholder={copy.itemType}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor={ids.itemTags} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.tags}
            </label>
            <input
              id={ids.itemTags}
              value={itemForm.tags}
              onChange={(event) => onUpdateItemForm({ tags: event.target.value })}
              className="input-shell w-full rounded-2xl px-4 py-3 text-sm"
              placeholder={copy.tags}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor={ids.itemNotes} className="block text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[var(--mist)]">
              {copy.notes}
            </label>
            <textarea
              id={ids.itemNotes}
              value={itemForm.notes}
              onChange={(event) => onUpdateItemForm({ notes: event.target.value })}
              className="input-shell min-h-24 w-full rounded-2xl px-4 py-3 text-sm"
              placeholder={copy.notes}
            />
          </div>
          <button type="button" onClick={onCreateItem} disabled={busyKey === 'item'} className="btn-primary rounded-[16px] px-5 py-3 text-sm font-semibold">
            {busyKey === 'item' ? '...' : copy.createItem}
          </button>
        </div>
      </div>
    </div>
  );
}
