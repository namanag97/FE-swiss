import React, { useState } from 'react';
import { SectionHeader, ComponentCard } from '../Shared';
import { Button, IconButton, ButtonGroup, SegmentedControl } from '../../Button';
import { Input, TextArea } from '../../Input';
import { Checkbox, Radio, Switch, Slider, Select, DatePicker } from '../../FormControls';
import { Download, Menu, Search, ArrowUpRight, Check, Grid, List } from 'lucide-react';

export const ButtonsSection = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');
    const [period, setPeriod] = useState('daily');

    return (
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SectionHeader number="05" title="Interaction" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ComponentCard title="Button Variants" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
                <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary" onClick={() => alert('Primary')}>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                </div>
            </ComponentCard>
            
            <ComponentCard title="States & Groups" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
                 <div className="space-y-6">
                    <div className="flex gap-4 items-center">
                        <Button isLoading={isLoading} onClick={() => setIsLoading(!isLoading)}>
                            {isLoading ? 'Loading...' : 'Click to Load'}
                        </Button>
                        <Button disabled>Disabled</Button>
                    </div>
                    <div>
                        <span className="text-[10px] font-mono uppercase text-braun-400 mb-2 block">Button Group</span>
                        <ButtonGroup>
                            <IconButton icon={<Grid size={16} />} variant={viewMode === 'grid' ? 'primary' : 'secondary'} onClick={() => setViewMode('grid')} />
                            <IconButton icon={<List size={16} />} variant={viewMode === 'list' ? 'primary' : 'secondary'} onClick={() => setViewMode('list')} />
                        </ButtonGroup>
                    </div>
                </div>
            </ComponentCard>
    
            <ComponentCard title="Icon Only" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
                 <div className="flex gap-4">
                     <IconButton icon={<Menu size={16} />} variant="secondary" />
                     <IconButton icon={<Search size={16} />} variant="secondary" />
                     <IconButton icon={<ArrowUpRight size={16} />} variant="primary" className="rounded-full" />
                 </div>
            </ComponentCard>
    
            <ComponentCard title="Segmented Control" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
                 <SegmentedControl 
                    value={period}
                    onChange={setPeriod}
                    options={[
                        { value: 'daily', label: 'Daily' },
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'monthly', label: 'Monthly' }
                    ]}
                 />
            </ComponentCard>
        </div>
      </section>
    );
};

export const InputsSection = () => {
    // ... Keeping existing Inputs implementation but wrapping properly
    // This part is preserved from the previous file content provided in the prompt context
    // re-implementing to ensure file completeness
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState(50);
  const [radioValue, setRadioValue] = useState('a');
  const [checkValue, setCheckValue] = useState(true);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="06" title="Form Controls" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
         <ComponentCard title="Text Inputs" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
            <div className="space-y-6">
               <Input label="Default Text" placeholder="Enter value..." />
               <Input label="Validation Error" error value="Invalid Input" readOnly />
            </div>
         </ComponentCard>

         <ComponentCard title="Selection" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
            <div className="space-y-4">
               <Checkbox label="Enable Notifications" checked={checkValue} onChange={(e) => setCheckValue(e.target.checked)} />
               <Radio label="Option A" name="g1" checked={radioValue === 'a'} onChange={() => setRadioValue('a')} />
               <Radio label="Option B" name="g1" checked={radioValue === 'b'} onChange={() => setRadioValue('b')} />
               <Switch label="Toggle Feature" checked={switchValue} onChange={(e) => setSwitchValue(e.target.checked)} />
            </div>
         </ComponentCard>
      </div>
    </section>
  );
};