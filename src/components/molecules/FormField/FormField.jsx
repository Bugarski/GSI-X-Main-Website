import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faChevronRight } from '@fortawesome/pro-light-svg-icons';
import Input from '../../atoms/Input/Input';
import styles from './FormField.module.scss';

/* ── Custom Select ─────────────────────── */

function CustomSelect({ id, name, value, onChange, placeholder, options, required, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = options.find((o) => o.value === value);

  const handleSelect = useCallback((opt) => {
    onChange({ target: { name, value: opt.value } });
    setOpen(false);
  }, [name, onChange]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div ref={ref} className={`${styles.customSelect} ${open ? styles.open : ''} ${hasError ? styles.selectError : ''}`}>
      <input type="hidden" name={name} value={value || ''} required={required} />
      <button
        type="button"
        id={id}
        className={styles.selectTrigger}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={value ? styles.selectValue : styles.selectPlaceholder}>
          {selected ? selected.label : (placeholder || 'Select...')}
        </span>
        <span className={styles.selectChevron} />
      </button>
      {open && (
        <ul className={styles.selectDropdown} role="listbox">
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`${styles.selectOption} ${opt.value === value ? styles.selectOptionActive : ''}`}
              onClick={() => handleSelect(opt)}
            >
              <span className={styles.selectOptionIdx}>{String(i + 1).padStart(2, '0')}</span>
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Custom Date Picker ────────────────── */

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function formatDate(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function parseDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split('-').map(Number);
  return { year: y, month: m - 1, day: d };
}

function displayDate(str) {
  const p = parseDate(str);
  if (!p) return '';
  return `${String(p.day).padStart(2, '0')}.${String(p.month + 1).padStart(2, '0')}.${p.year}`;
}

function CustomDatePicker({ id, name, value, onChange, placeholder, required, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const today = useMemo(() => {
    const n = new Date();
    return { year: n.getFullYear(), month: n.getMonth(), day: n.getDate() };
  }, []);

  const parsed = parseDate(value);
  const [viewYear, setViewYear] = useState(parsed?.year ?? today.year);
  const [viewMonth, setViewMonth] = useState(parsed?.month ?? today.month);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const selectDay = (day) => {
    onChange({ target: { name, value: formatDate(viewYear, viewMonth, day) } });
    setOpen(false);
  };

  const clearDate = () => {
    onChange({ target: { name, value: '' } });
    setOpen(false);
  };

  const goToday = () => {
    setViewYear(today.year);
    setViewMonth(today.month);
    selectDay(today.day);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (day) =>
    parsed && parsed.year === viewYear && parsed.month === viewMonth && parsed.day === day;
  const isToday = (day) =>
    today.year === viewYear && today.month === viewMonth && today.day === day;

  return (
    <div ref={ref} className={`${styles.customDate} ${open ? styles.open : ''} ${hasError ? styles.dateError : ''}`}>
      <input type="hidden" name={name} value={value || ''} required={required} />
      <button
        type="button"
        id={id}
        className={styles.dateTrigger}
        onClick={() => setOpen((p) => !p)}
      >
        <span className={value ? styles.dateValue : styles.datePlaceholder}>
          {value ? displayDate(value) : (placeholder || 'dd.mm.yyyy')}
        </span>
        <FontAwesomeIcon icon={faCalendarDays} className={styles.dateIcon} />
      </button>
      {open && (
        <div className={styles.calendarDropdown}>
          <div className={styles.calendarHeader}>
            <button type="button" className={styles.calendarNav} onClick={prevMonth}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className={styles.calendarTitle}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button type="button" className={styles.calendarNav} onClick={nextMonth}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <div className={styles.calendarWeekdays}>
            {DAY_LABELS.map((d) => (
              <span key={d} className={styles.calendarWeekday}>{d}</span>
            ))}
          </div>
          <div className={styles.calendarGrid}>
            {cells.map((day, i) =>
              day ? (
                <button
                  key={i}
                  type="button"
                  className={`${styles.calendarDay} ${isSelected(day) ? styles.calendarDaySelected : ''} ${isToday(day) ? styles.calendarDayToday : ''}`}
                  onClick={() => selectDay(day)}
                >
                  {day}
                </button>
              ) : (
                <span key={i} className={styles.calendarDayEmpty} />
              ),
            )}
          </div>
          <div className={styles.calendarFooter}>
            <button type="button" className={styles.calendarFooterBtn} onClick={clearDate}>Clear</button>
            <button type="button" className={styles.calendarFooterBtn} onClick={goToday}>Today</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── FormField ─────────────────────────── */

function FormField({
  type = 'text',
  name,
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  options = [],
  ...rest
}) {
  const isSelect = type === 'select' || (options && options.length > 0);
  const isDate = type === 'date';
  const inputId = name ? `field-${name}` : undefined;
  const hasError = Boolean(error);

  if (isSelect) {
    return (
      <div className={`${styles.wrapper} ${hasError ? styles.hasError : ''}`.trim()}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}
        <CustomSelect
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          required={required}
          hasError={hasError}
        />
        {error && (
          <span id={inputId ? `${inputId}-error` : undefined} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }

  if (isDate) {
    return (
      <div className={`${styles.wrapper} ${hasError ? styles.hasError : ''}`.trim()}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}
        <CustomDatePicker
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          hasError={hasError}
        />
        {error && (
          <span id={inputId ? `${inputId}-error` : undefined} className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <Input
      type={type}
      name={name}
      label={label}
      placeholder={placeholder}
      required={required}
      error={error}
      value={value}
      onChange={onChange}
      id={inputId}
      textarea={type === 'textarea'}
      {...rest}
    />
  );
}

export default FormField;
