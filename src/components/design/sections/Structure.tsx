import React, { useState } from 'react';
import { SectionHeader, ComponentCard } from '../Shared';
import { Container, Stack, Grid, Divider, Card, Panel } from '../../LayoutPrimitives';
import { Tabs, Breadcrumbs, Pagination } from '../../Navigation';
import { LayoutGrid, BarChart, Settings } from 'lucide-react';

export const LayoutSection = () => (
  <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <SectionHeader number="03" title="Layout Primitives" />
    <div className="space-y-16">
        
       {/* Container & Card */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <ComponentCard title="Container & Surfaces" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
                <div className="space-y-6">
                    <Card className="hover:scale-[1.02] transition-transform duration-300 cursor-default">
                        <h5 className="font-medium text-braun-900 mb-2">Card Surface</h5>
                        <p className="text-sm text-braun-600">This is a standard content card with a 1px border. Hover to see interaction state.</p>
                    </Card>
                    <Panel title="Collapsible Panel" className="animate-in fade-in slide-in-from-bottom-2 duration-500 delay-200 fill-mode-both">
                        <p className="text-sm text-braun-600">Hidden detail content reveals itself with a standard slide animation.</p>
                    </Panel>
                </div>
           </ComponentCard>

           <ComponentCard title="Stacks (Flex)" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
               <Stack gap={6}>
                   {[1, 2, 3].map((item, i) => (
                       <div 
                        key={item} 
                        className="p-4 bg-braun-100 text-xs font-mono text-braun-500 animate-in slide-in-from-left-4 duration-500 fill-mode-both hover:bg-braun-200 transition-colors cursor-default"
                        style={{ animationDelay: `${300 + (i * 100)}ms` }}
                       >
                           Item 0{item}
                       </div>
                   ))}
               </Stack>
           </ComponentCard>
       </div>

       {/* Grid System */}
       <ComponentCard title="Grid System" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
          <Stack gap={8}>
            <div>
                <span className="text-[10px] font-mono text-braun-400 mb-2 block">COLS=3 GAP=4</span>
                <Grid cols={3} gap={4}>
                    {[1,2,3].map(i => (
                        <div key={i} className="h-16 border border-dashed border-braun-300 bg-braun-50 flex items-center justify-center text-[10px] font-mono text-braun-400 hover:bg-braun-100 transition-colors cursor-default">Col</div>
                    ))}
                </Grid>
            </div>
          </Stack>
       </ComponentCard>
    </div>
  </section>
);

export const NavigationSection = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [page, setPage] = useState(1);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SectionHeader number="04" title="Navigation" />
      <div className="space-y-8">
         
         <ComponentCard title="Breadcrumbs" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
            <Breadcrumbs 
                items={[
                    { label: 'Home', onClick: () => {} },
                    { label: 'Workspaces', onClick: () => {} },
                    { label: 'Finance_Q3_Analysis' }
                ]}
            />
         </ComponentCard>
  
         <ComponentCard title="Tabs" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
            <Tabs 
                activeId={activeTab}
                onChange={setActiveTab}
                items={[
                    { id: 'Overview', label: 'Overview', icon: <LayoutGrid size={14} /> },
                    { id: 'Analytics', label: 'Analytics', icon: <BarChart size={14} /> },
                    { id: 'Settings', label: 'Settings', icon: <Settings size={14} /> }
                ]}
            />
            <div className="p-6 bg-braun-50 mt-4 border border-braun-100 h-24 flex items-center justify-center text-xs font-mono text-braun-400">
                Content Panel: {activeTab}
            </div>
         </ComponentCard>
  
         <ComponentCard title="Pagination" className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
            <div className="flex flex-col items-center gap-4">
               <Pagination 
                 currentPage={page} 
                 totalPages={10} 
                 onPageChange={setPage} 
               />
               <span className="text-[10px] font-mono text-braun-400">Value: {page}</span>
            </div>
         </ComponentCard>
      </div>
    </section>
  );
};